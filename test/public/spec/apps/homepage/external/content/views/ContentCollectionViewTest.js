define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var expect               = require( 'chai' ).expect;

	describe ( 'ContentCollectionViewTest CollectionView', function () {

		var collectionView;

		before ( function () {
			var ContentCollectionView = require( 'apps/homepage/external/content3/views/ContentCollectionView' );
			collectionView = new ContentCollectionView();
		} );

		it( 'should be an instance of Marionette CollectionView', function () {
			expect( collectionView ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have a tagName ', function () {
			expect( collectionView.tagName ).to.not.be.equal( undefined );
		} );

		it( 'should have an itemView ', function () {
			var Contentcompositeview = require( 'apps/homepage/external/content3/views/ContentCompositeView' );
			expect( collectionView.itemView ).to.not.be.equal( undefined );
			expect( collectionView.itemView ).to.be.equal( Contentcompositeview );
		} );

	} );

} );
