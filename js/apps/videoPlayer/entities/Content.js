define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var moment   = require( 'moment' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	var getConfig = require( 'common/helpers/getConfig' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.Content = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',

			'path'        : 'ContentService',

			'defaults'    : {
				'currentTime'        : 0,
				'licenseId'          : 0,
				'taskId'             : 0,
				'GuidebookFileName'  : '',
				'AudioFileName'      : '',
				'TranscriptFileName' : ''
			},

			'initialize' : function ( attr, options ) {
				_.extend( this, options );

				this.setVideoTypeId( 1 );
				this.setVideoUrl();
			},

			'getViewingId' : function () {
				var defer = App.Deferred();
				var now   = moment().tz( 'MST7MDT' ).format( 'MMM DD, YYYY h:mm:ss a' );

				var request = {
					'path'       : 'core.ViewingProgressGateway',
					'objectPath' : 'core.ViewingProgress',
					'method'     : 'Create',
					'args'       : {
						'PersonnelId'        : Session.personnelId(),
						'ContentId'          : this.get( 'ContentId' ),
						'ContentName'        : '',
						'EditionName'        : '',
						'ProgramName'        : '',
						'FileName'           : '',
						'ContentDescription' : '',
						'ViewingId'          : 0,
						'BeganViewingDate'   : now,
						'SecondsCompleted'   : 0
					}
				};

				var viewingId = Remoting.fetch( request );

				App.when( viewingId ).done( function ( resp ) {
					this.set( 'ViewingId', resp[ 0 ].ViewingId );
					defer.resolve();
				}.bind( this ) ).fail( function () {
					defer.reject();
				} );

				return defer.promise();
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
						'ViewingId'        : this.get( 'ViewingId' ),
						'SecondsCompleted' : this.get( 'SecondsCompleted' ),
						'licId'            : this.get( 'licenseId' ),
						'taskId'           : this.get( 'taskId' )
					}
				};
			},

			'updateCatalogVideoViewingProgress' : function () {
				var data = {
					'path'   : 'CatalogService',
					'method' : 'updateCatalogVideoViewingProgress',
					'args'   : {
						'personnelId' : Session.personnelId(),
						'contentId'   : this.id
					}
				};

				return Remoting.fetch( data );
			},

			'getCurrentTime' : function () {
				return parseInt( this.get( 'currentTime' ) , 10 );
			},

			'getResources' : function () {

				var guideBookStoragePath  = getConfig( 'guideBookStoragePath' );
				var contentAudioPath      = getConfig( 'contentAudioPath' );
				var contentTranscriptPath = getConfig( 'contentTranscriptPath' );

				var guidebookFileName  = this.get( 'GuidebookFileName' );
				var audioFileName      = this.get( 'AudioFileName' );
				var transcriptFileName = this.get( 'TranscriptFileName' );

				var results = [
					{
						'previewPath'  : guideBookStoragePath + guidebookFileName,
						'downloadPath' : guideBookStoragePath + guidebookFileName,
						'thumbnail'    : '/img/guidebook.jpg',
						'name'         : guidebookFileName
					}, {
						'previewPath'  : contentAudioPath + audioFileName,
						'downloadPath' : contentAudioPath + audioFileName,
						'thumbnail'    : '/img/audio.jpg',
						'name'         : audioFileName
					}, {
						'previewPath'  : contentTranscriptPath + transcriptFileName,
						'downloadPath' : contentTranscriptPath + transcriptFileName,
						'thumbnail'    : '/img/transcribe.jpg',
						'name'         : transcriptFileName
					}
				];

				// if a path does not exist for the resource, do not return it
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

			'setVideoTypeId' : function ( videoTypeId ) {
				this.set( 'VideoTypeId', videoTypeId );
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

		// licenseId is from a course, optionally passed in
		App.reqres.setHandler( 'videoPlayer:getVideoContent', function ( videoId, licenseId ) {
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

					App.when( newContent, contentIsInCore, getLicenses ).done( function ( content, contentInCore, licenses ) {
						// check if the user has the license
						var hasLicense = licenses.some( function ( license ) {
							return license.get( 'LicenseId' ) === Number( licenseId );
						} );

						if ( hasLicense ) {
							return defer.resolve( content );
						}

						// If the content is in the core library, it is limited
						// If it is not in the core library, check the ContentType,
						// If ContentType is 6 (common core library), then the content is limited,
						// Otherwise the user needs special license to view the content
						if ( contentInCore.get( 'isInCore' ) || content.get( 'ContentTypeId' ) === 6 ) {
							content.set( 'limited', true );
						} else {
							// show an error message, the content needs special license
							defer.reject( new Error( 'This video requires that viewers have a specific type of license.' ) );
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
