define( function ( require ) {
	'use strict';

	var base     = require( 'external/external/content/external/recommended/base' );
	var expect   = require( 'chai' ).expect;

	describe ( 'Base Test for Recommended', function () {

		it ( 'should be an instance of BaseObject', function () {
			var BaseObj  = require( 'external/BaseObject' );
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it ( 'id should be equal to recommended ', function () {
			expect( base._id ).to.be.equal( 'recommended' );
		} );

		it ( 'header should contain Recommended ', function () {
			expect( base._header ).to.contain( 'Recommended' );
		} );

		it ( 'collection should be equal to RecommendedCollection ', function () {
			var collection = require( 'external/external/content/external/recommended/collections/RecommendedCollection' );
			expect( base._items ).to.be.equal( collection );
		} );

	} );

} );