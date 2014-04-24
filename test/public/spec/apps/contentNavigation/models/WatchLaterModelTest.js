define( function ( require ) {

	'use strict';

	var expect		= require( 'chai' ).expect;
	var Backbone	= require( 'backbone' );

	var WatchLaterCollectionModel = require( 'contentNavigation/models/WatchLaterModel' );
	var watchLaterCollectionModel = new WatchLaterCollectionModel();


	describe( 'WatchLater Model', function () {

		it( 'should be an instance of a Backbone.Model object', function () {
			watchLaterCollectionModel.should.be.an.instanceof( Backbone.Model );
		} );

		it( 'should possess the default properties LibraryModel object has', function () {
			watchLaterCollectionModel.attributes.should.include.keys( 'ContentId' );
		} );

		it( 'should contain the default values for the default properties defined in the WatchLaterModel object', function () {
			watchLaterCollectionModel.attributes.ContentId.should.be.equal( -1 );
		} );

		it( 'should have "ContentId" as idAttribute', function () {
			expect( watchLaterCollectionModel.idAttribute ).to.equal( 'ContentId' );
		} );

	} );
} );