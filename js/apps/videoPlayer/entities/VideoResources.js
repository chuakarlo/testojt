define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.VideoResources = Backbone.CFCollection.extend( {

			'initialize' : function ( options ) {

				_.bindAll( this );
				_.extend( this, options );

				return this;
			}

		} );

		var API = {
			'getResources' : function ( videoModel ) {
				return new Entities.VideoResources( videoModel.getResources() );
			}
		};

		App.reqres.setHandler( 'videoPlayer:getVideoResources', function ( videoModel ) {
			return API.getResources( videoModel );
		} );

	} );

} );
