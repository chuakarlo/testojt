define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	require( 'videoPlayer/entities/RelatedVideos' );

	describe( 'VideoPlayer Entities', function () {

		it( 'should exist on `App.VideoPlayer`', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.have.property( 'Entities' );
			App.VideoPlayer.Entities.should.have.property( 'RelatedVideos' );
		} );

		describe( 'RelatedVideos Entity', function () {

			var collection;

			before( function () {
				collection = new App.VideoPlayer.Entities.RelatedVideos();
			} );

			after( function () {
				collection = null;
			} );

			it( 'should be an instance of CFModel', function () {
				collection.should.be.an.instanceof( Backbone.CFCollection );
			} );

			it( 'does have a `path`', function () {
				collection.should.have.property( 'path' );
				collection.path.should.eql( 'RespondService' );
			} );

			it( 'does have a `model`', function () {
				collection.should.have.property( 'model' );
			} );

			it( 'does have `getReadOptions`', function () {
				collection.should.have.property( 'getReadOptions' );
				collection.getReadOptions.should.be.a( 'function' );
			} );

			describe( '.getReadOptions', function () {

				it( 'does return read options', function () {
					var options = collection.getReadOptions();

					options.should.have.property( 'method' );
					options.method.should.eql( 'relatedVideos' );

					options.should.have.property( 'args' );
				} );

			} );

			describe( '.parse', function () {

				it( 'does remove the index 0 response element', function () {
					var response  = [ 1, 2, 3 ];
					var parseResp = [ 2, 3 ];

					collection.parse( response ).should.eql( parseResp );
				} );

			} );

		} );

	} );

} );
