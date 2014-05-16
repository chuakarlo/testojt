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

			'previewUrl'  : 'http://upload.content.pd360.com/PD360/media/',

			'defaults'    : {
				'currentTime'        : 0,
				'GuidebookFileName'  : '',
				'AudioFileName'      : '',
				'TranscriptFileName' : ''
			},

			'initialize' : function ( attr, options ) {
				_.extend( this, options );

				this.setVideoTypeId();

				return this;
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getContentByContentIdAndLicenseTypes',
					'args'   : {
						'contId'   : this.videoId,
						'licTypes' : this.licenseType
					}
				};
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
				var results = [
					{
						'previewPath'  : this.previewUrl + 'gb/' + this.get( 'GuidebookFileName' ),
						'downloadPath' : '/gb/' + this.get( 'GuidebookFileName' ),
						'thumbnail'    : '/img/guidebook.jpg'
					}, {
						'previewPath'  : '',
						'downloadPath' : '/mp3/' + this.get( 'AudioFileName' ),
						'thumbnail'    : '/img/audio.jpg'
					}, {
						'previewPath'  : this.previewUrl + 'transcripts/' + this.get( 'TranscriptFileName' ),
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

			'setVideoTypeId' : function () {
				this.set( 'VideoTypeId', 1 );
			},

			'setQueue' : function ( queueContentsIds ) {
				this.set( 'queued', _.contains( queueContentsIds, this.id ) );
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
			}

		};

		App.reqres.setHandler( 'videoPlayer:getVideoContent', function ( options ) {
			return API.getContent( options );
		} );

	} );

} );
