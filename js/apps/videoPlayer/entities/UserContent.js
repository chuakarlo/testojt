define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var moment   = require( 'moment' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	require( 'videoPlayer/entities/Content' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.UserContent = Entities.Content.extend( {

			'idAttribute' : 'UUVideoId',

			'path'        : 'uuvideos.UUVideoGateway',

			'defaults'    : {
				'GuidebookFileName'      : '',
				'AudioFileName'          : '',
				'TranscriptFileName'     : '',
				'currentTime'            : 0,
				'ContentId'              : 0,
				'ContentParentId'        : 0,
				'ContentTypeId'          : 0,
				'SegmentLengthInSeconds' : 0
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
					response[ key ] = response[ val ];
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

			'getUpdateOptions' : function () {
				var now = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss A' );

				return {
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
			}

		} );

		var API = {
			'getContent' : function ( options ) {
				var defer = App.Deferred();

				var content = new Entities.UserContent( { }, options );

				content.fetch( {

					'success' : function () {
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
