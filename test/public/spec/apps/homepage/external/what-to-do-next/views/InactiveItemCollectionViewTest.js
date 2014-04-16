define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe( 'InactiveItemCollectionView CollectionView', function () {

		before ( function () {
			var InactiveItemCollectionView = require( 'apps/homepage/external/what-to-do-next/views/InactiveItemCollectionView' );
			var WidgetCollection     = require( 'apps/homepage/external/what-to-do-next/collections/WidgetCollection' );
			var parent                = [];
			require( 'apps/homepage/external/what-to-do-next/external/group-activity/base' ).register( parent, {} );

			var collection        = new WidgetCollection ( parent );
			this.collectionView = new InactiveItemCollectionView( { 'model' : collection.models[0] } );
		} );

		it( 'should be an instance of Collection View', function () {
			expect( this.collectionView ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have an itemViewcontainer', function () {
			expect( this.collectionView.itemViewContainer ).to.not.be.equal( undefined );
		} );

		it( 'should have a tagName', function () {
			expect( this.collectionView.tagName ).to.not.be.equal( undefined );
		} );

	} );

} );