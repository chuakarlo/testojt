define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.Content = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',

			'path'        : 'ContentService',

			'defaults'    : {
				'currentTime'        : 0,
				'GuidebookFileName'  : '',
				'AudioFileName'      : '',
				'TranscriptFileName' : ''
			},

			'initialize' : function ( attr, options ) {
				_.extend( this, options );

				this.setVideoTypeId();
				this.setVideoUrl();
			},

			'getReadOptions' : function () {
				var readOptions = { };

				if ( this.licenseType ) {
					readOptions = {
						'method' : 'getContentByContentIdAndLicenseTypes',
						'args'   : {
							'contId'   : this.videoId,
							'licTypes' : this.licenseType
						}
					};
				} else {
					readOptions = {
						'path'   : 'core.ContentGateway',
						'method' : 'getSrch',
						'args'   : {
							'id' : this.videoId
						}
					};
				}

				return readOptions;
			},

			'getUpdateOptions' : function () {
				return {
					'path'   : 'RespondService',
					'method' : 'RespondUpdatedViewingTimeWithStatusCheck',
					'args'   : {
						'PersonnelId'      : Session.personnelId(),
						'ContentId'        : this.id,
						'ViewingId'        : 1,
						'SecondsCompleted' : this.getCurrentTime(),
						'licId'            : 0,
						'taskId'           : 0
					}
				};
			},

			'getCurrentTime' : function () {
				return parseInt( this.get( 'currentTime' ) , 10);
			},

			'getResources' : function () {
				var config = App.request( 'videoPlayer:config' );

				var results = [
					{
						'previewPath'  : config.video.previewUrl + 'gb/' + this.get( 'GuidebookFileName' ),
						'downloadPath' : '/gb/' + this.get( 'GuidebookFileName' ),
						'thumbnail'    : '/img/guidebook.jpg'
					}, {
						'previewPath'  : config.video.previewUrl + 'gb/' + this.get( 'AudioFileName' ),
						'downloadPath' : '/mp3/' + this.get( 'AudioFileName' ),
						'thumbnail'    : '/img/audio.jpg'
					}, {
						'previewPath'  : config.video.previewUrl + 'transcripts/' + this.get( 'TranscriptFileName' ),
						'downloadPath' : '/transcripts/' + this.get( 'TranscriptFileName' ),
						'thumbnail'    : '/img/transcribe.jpg'
					}
				];

				results = _.filter( results, function ( result ) {
					var arrPath = result.downloadPath.split( '/' );

					if ( _.last( arrPath ) !== '' ) {
						return result;
					}
				} );

				return results;
			},

			'setQueue' : function ( queueContentsIds ) {
				this.set( 'queued', _.contains( queueContentsIds, this.id ) );
			},

			'setVideoTypeId' : function () {
				this.set( 'VideoTypeId', 1 );
			},

			'setVideoUrl' : function () {
				this.set( 'VideoUrl', Backbone.history.location.href );
			}

		} );

		Entities.ContentIsInCore = Backbone.CFModel.extend( {

			'path' : 'ContentService',

			'initialize' : function ( attr, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'contentIsInCoreLicense',
					'args'   : {
						'contentId' : this.videoId
					}
				};
			},

			'parse' : function ( response ) {
				return { 'isInCore' : response };
			}

		} );

		var API  = {

			'getContent' : function ( options ) {
				var defer = App.Deferred();

				var videoContent = new Entities.Content( { }, options );

				videoContent.fetch( {

					'success' : function () {
						defer.resolve( videoContent );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching video content' ) );
					}

				} );

				return defer.promise();
			},

			'contentIsInCoreLicense' : function ( options ) {
				var defer   = App.Deferred();
				var results = new Entities.ContentIsInCore( { }, options );

				results.fetch( {

					'success' : function () {
						defer.resolve( results );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching data' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'videoPlayer:getVideoContent', function ( videoId ) {
			var getLicenses = App.request( 'user:licenses' );
			var defer       = App.Deferred();

			App.when( getLicenses ).then( function ( licenses ) {

				var licenseType = _.unique( licenses.pluck( 'LicenseContentTypeId' ) );

				// ContentService.getContentByContentIdAndLicenseTypes
				return API.getContent( {
					'videoId'     : videoId,
					'licenseType' : licenseType
				} );

			} ).then( function ( licensedContent ) {

				if ( _.isUndefined( licensedContent.id ) ) {
					// core.ContentGateway.getSrch
					var newContent =  API.getContent( {
						'videoId' : videoId
					} );

					// ContentService.contentIsInCoreLicense
					var contentIsInCore = API.contentIsInCoreLicense( {
						'videoId' : videoId
					} );

					App.when( newContent, contentIsInCore ).done( function ( content, contentInCore ) {

						// If the content is in the core library, it is limited
						// If it is not in the core library, check the ContentType,
						// If ContentType is 6, then the content is limited,
						// Otherwise the user needs special license to view the content
						if ( contentInCore.get( 'isInCore' ) ) {
							content.set( 'limited', true );
						} else {
							if ( content.get( 'ContentTypeId' ) === 6 ) {
								content.set( 'limited', true );
							} else {
								// show an error message, the content needs special license
								defer.reject( new Error( 'This video requires that viewers have a specific type of license.' ) );
							}
						}

						defer.resolve( content );

					} ).fail( function ( error ) {

						return App.errorHandler.bind( App, {
							'region'  : App.content,
							'message' : error.message
						} );

					} );
				} else {
					defer.resolve( licensedContent );
				}

			} );

			return defer.promise();
		} );

	} );

} );
