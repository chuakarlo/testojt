define( function ( require ) {

	'use strict';

	var expect		        = require( 'chai' ).expect;
	var Backbone	        = require( 'backbone' );

	var WatchLaterCollection	= require( 'contentNavigation/collections/watchLaterCollection' );
	var watchLaterCollection	= new WatchLaterCollection();

	var WatchLaterModel		= require( 'contentNavigation/models/WatchLaterModel' );

	describe( 'WatchLater Collection', function () {

		it( 'should be an instance of a Backbone.Collection object', function () {
			watchLaterCollection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'should have WatchLaterModel as model', function () {
			watchLaterCollection.model.should.be.equal( WatchLaterModel );
		} );

		it( 'should have a url property', function () {
			expect( watchLaterCollection.url ).to.equal( undefined );
		} );

		it( 'should be an empty Backbone.Collection', function () {
			expect( watchLaterCollection.length ).to.equal( 0 );
		} );


		describe( 'creating new collection using this instance', function () {

			var _testFilters = [
				{ 'ContentId' : -1 },
			];

			var _testWatchLaterCollection = new WatchLaterCollection( _testFilters );

			it( 'should not be empty', function () {
				expect( _testWatchLaterCollection.length ).to.equal( 1 );
			} );

			it( 'should contain all the attributes of defined WatchLaterModel when retrieved from the collection', function () {
				_testWatchLaterCollection.at( 0 ).attributes.should.include.keys( 'ContentId' );
			} );

		} );

	} );

} );