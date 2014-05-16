define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		var API = {
			'getResources' : function ( videoModel ) {
				return new Backbone.Collection( videoModel.getResources() );
			}
		};

		App.reqres.setHandler( 'videoPlayer:getVideoResources', function ( videoModel ) {
			return API.getResources( videoModel );
		} );

	} );

} );
