define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var moment   = require( 'moment' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	require( 'videoPlayer/entities/Content' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.UserContent = Entities.Content.extend( {

			'idAttribute' : 'UUVideoId',

			'path'        : 'uuvideos.UUVideoGateway',

			'defaults'    : {
				'GuidebookFileName'      : '',
				'AudioFileName'          : '',
				'TranscriptFileName'     : '',
				'ContentName'            : '',
				'ContentDescription'     : '',
				'currentTime'            : 0,
				'ContentId'              : 0,
				'ContentParentId'        : 0,
				'ContentTypeId'          : 0,
				'SegmentLengthInSeconds' : 0,
				'licId'                  : 0,
				'taskId'                 : 0
			},

			'initialize' : function ( model, options ) {
				_.extend( this, options );

				this.setVideoTypeId( 2 );
				this.setVideoUrl();
			},

			'parse' : function ( response ) {
				var attrMap = {
					'ContentName'        : 'Name',
					'ContentDescription' : 'Description'
				};

				_.each( attrMap, function ( val, key ) {
					if ( response[ val ] ) {
						response[ key ] = response[ val ];
					}
				} );

				return response;
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getSrch',
					'args'   : {
						'id' : this.videoId
					}
				};
			},

			'getViewingId' : function () {
				var now = moment().tz( 'MST7MDT' ).format( 'MMM D, YYYY h:mm:ss a' );

				var request = {
					'path'       : 'uuvideos.UUVideoViewingProgressGateway',
					'objectPath' : 'uuvideos.UUVideoViewingProgress',
					'method'     : 'create',
					'args'       : {
						'PersonnelId'      : Session.personnelId(),
						'UUVideoId'        : this.id,
						'ViewingId'        : 0,
						'BeganViewingDate' : now
					}
				};

				var viewingId = Remoting.fetch( request );

				App.when( viewingId ).done( function ( resp ) {

					this.set( 'ViewingId', resp[ 0 ].ViewingId );

				}.bind( this ) );
			},

			'getUpdateOptions' : function () {
				return {
					'path'   : 'RespondService',
					'method' : 'RespondUpdatedViewingTimeWithStatusCheck',
					'args'   : {
						'PersonnelId'      : Session.personnelId(),
						'ContentId'        : this.id,
						'ViewingId'        : this.get( 'ViewingId' ),
						'SecondsCompleted' : this.getCurrentTime(),
						'licId'            : this.get( 'licenseId' ),
						'taskId'           : this.get( 'taskId' )
					}
				};
			}

		} );

		var API = {

			'getContent' : function ( options ) {
				var defer = App.Deferred();

				var content = new Entities.UserContent( { }, options );

				content.fetch( {

					'success' : function () {
						content.getViewingId();

						defer.resolve( content );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching video content' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'video:userUploaded', function ( videoId ) {
			return API.getContent( { 'videoId' : videoId } );
		} );

	} );

} );
