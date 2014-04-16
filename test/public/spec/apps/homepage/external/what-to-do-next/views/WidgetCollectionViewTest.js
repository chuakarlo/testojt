define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe( 'WidgetCollectionView CollectionView', function () {

		var collectionView;

		before ( function () {
			var WidgetCollectionView = require( 'apps/homepage/external/what-to-do-next/views/WidgetCollectionView' );
			var WidgetCollection     = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
			var manifest             = require( 'apps/homepage/external/what-to-do-next/manifest' );
			var collection           = new WidgetCollection( manifest );

			collectionView = new WidgetCollectionView( { 'collection' : collection } );
		} );

		it( 'should be an instance of CollectionView', function () {
			expect( collectionView ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have an itemView', function () {
			expect( collectionView.itemView ).to.not.be.equal( undefined );
		} );

		it( 'should have a className', function () {
			expect( collectionView.className ).to.not.be.equal( undefined );
		} );

	} );

} );