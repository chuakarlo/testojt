define( function ( require ) {
	'use strict';

	require( 'moment-timezone' );
	require( 'timezone' );

	var _        = require( 'underscore' );
	var App      = require( 'App' );

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
				return 0;
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
