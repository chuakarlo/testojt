define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	require( 'videoPlayer/entities/VideoResources' );

	describe( 'VideoPlayer Entities', function () {

		it( 'should exist on `App.VideoPlayer`', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.have.property( 'Entities' );
		} );

	} );

} );
