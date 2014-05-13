define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	require( 'videoPlayer/entities/Segments' );

	describe( 'Segments entities', function () {
		it( 'is attached to `App.VideoPlayer.Entities`', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.have.property( 'Entities' );
			App.VideoPlayer.Entities.should.have.property( 'Segments' );
		} );

		describe( 'when initialized', function () {
			var fakeVideo = {
				'ContentId'       : 0,
				'ContentParentId' : 0,
				'ContentTypeId'   : 0
			};

			var collection;

			before( function () {
				collection = new App.VideoPlayer.Entities.Segments( fakeVideo );
			} );

			after( function () {
				collection = null;
			} );

			it( 'should be instance of CFCollection', function () {
				collection.should.be.an.instanceof( Backbone.CFCollection );
			} );

			it( 'should have property getReadOptions and return options', function () {
				collection.should.have.property( 'getReadOptions' );
				collection.getReadOptions.should.be.a( 'function' );
			} );

		} );
	} );
} );
