define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var expect               = require( 'chai' ).expect;

	describe ( 'ContentCollectionViewTest CollectionView', function () {

		before ( function () {
			var ContentCollectionView = require( 'apps/homepage/external/content/views/ContentCollectionView' );
			this.collectionView = new ContentCollectionView();
		} );

		it( 'should be an instance of Marionette CollectionView', function () {
			expect( this.collectionView ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have a tagName ', function () {
			expect( this.collectionView.tagName ).to.not.be.equal( undefined );
		} );

		it( 'should have an itemView ', function () {
			var Contentcompositeview = require( 'apps/homepage/external/content/views/ContentCompositeView' );
			expect( this.collectionView.itemView ).to.not.be.equal( undefined );
			expect( this.collectionView.itemView ).to.be.equal( Contentcompositeview );
		} );

	} );

} );