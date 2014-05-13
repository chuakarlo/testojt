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
			App.VideoPlayer.Entities.should.have.property( 'VideoResources' );
		} );

		describe( 'VideoResources Entity', function () {

			var collection;

			before( function () {
				collection = new App.VideoPlayer.Entities.VideoResources();
			} );

			after( function () {
				collection = null;
			} );

			it( 'should be an instance of CFModel', function () {
				collection.should.be.an.instanceof( Backbone.CFCollection );
			} );

		} );

	} );

} );
