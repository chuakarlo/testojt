
define( function ( require ) {
	'use strict';


	var Marionette        = require( 'marionette' );
	var expect            = require( 'chai' ).expect;

	describe( 'ContentItemCollectionView CollectionView ', function () {
		before ( function () {
			var ContentItemCollectionView = require ( 'apps/homepage/external/content/views/ContentItemCollectionView' );
			//should have a testing having a model
			this.collectionView           = new ContentItemCollectionView( );
		} );

		it ( 'should be an instance of Marionette CompositeView', function () {
			expect( this.collectionView ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it ( 'should have a tagName', function () {
			expect( this.collectionView.tagName ).to.not.equal( undefined );
		} );

		it ( 'should have a itemView', function () {
			var ContentItemView = require( 'apps/homepage/external/content/views/ContentItemView' );

			expect( this.collectionView.itemView ).to.not.equal( undefined );
			expect( this.collectionView.itemView ).to.be.equal( ContentItemView );
		} );

	} );

} );
