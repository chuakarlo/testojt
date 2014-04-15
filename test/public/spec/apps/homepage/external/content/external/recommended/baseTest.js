define( function ( require ) {
	'use strict';

	var baseObj  = require( 'apps/homepage/BaseObject' );
	var base     = require( 'apps/homepage/external/content/external/recommended/base' );

	describe ( 'baseTest for Recommended', function () {
		var collectionParam;

		before( function () {
			collectionParam = base.Collection;
			console.log( base );
		} );

		it( 'should be an instance of `BaseObject`', function () {
			base.should.be.an.instanceof( baseObj );
		} );

		it( 'should have `id` property', function () {
			base.should.have.property( '_id' );
		} );

		it( 'should have `id` property with value of `recommended`', function () {
			base._id.should.be.equal( 'recommended' );
		} );

		it( 'should have `_header` property', function () {
			base.should.have.property( '_header' );
		} );

		it( 'should have `.getCollection` property', function () {
			base.should.have.property( 'getCollection' );
		} );

		describe ( '`.getPreFetchLogic`', function () {
			it( 'should have `getPreFetchLogic` property', function () {

			} );
		} );

		it( 'should have `.getPreFetchLogic` property', function () {
			base.should.have.property( 'getPreFetchLogic' );
		} );

		// it( 'collection should be equal to RecommendedCollection ', function () {
		// 	var collection = require( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );
		// 	expect( base._items ).to.be.equal( collection );
		// } );

	} );

} );