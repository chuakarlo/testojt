define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.UserContent = Backbone.CFModel.extend( {

			'idAttribute' : 'UUVideoId',
			'path'        : 'uuvideos.UUVideoGateway',

			'initialize' : function ( model, options ) {
				_.extend( this, options );

				this.setVideoTypeId();
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getSrch',
					'args'   : {
						'id' : this.videoId
					}
				};
			},

			'setVideoTypeId' : function () {
				this.set( 'VideoTypeId', 2 );
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
