define( function ( require ) {
	'use strict';

	var base     = require( 'external/external/content/base' );
	var expect   = require( 'chai' ).expect;

	describe ( 'Base Test for Content', function () {

		it ( 'should be an instance of BaseObject', function () {
			var BaseObj  = require( 'external/BaseObject' );
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it ( 'external view should be equal to ContentCollectionView ', function () {
			var itemView = require( 'external/external/content/views/ContentCollectionView' );
			expect( base.getExternalView ).to.be.equal( itemView );
		} );
	} );

} );