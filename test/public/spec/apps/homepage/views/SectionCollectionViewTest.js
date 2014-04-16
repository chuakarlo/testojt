define( function ( require ) {
	'use strict';

	var Marionette            = require( 'marionette' );
	var expect                = require( 'chai' ).expect;

	describe( 'SectionCollectionView CollectionView', function () {

		var view;

		before ( function () {
			var SectionCollectionView = require( 'external/views/SectionCollectionView' );
			var SectionCollection     = require( 'external/collections/SectionCollection' );
			var parent                = [];
			require( 'apps/homepage/external/what-to-do-next/base' ).register( parent, {} );

			var collection = new SectionCollection ( parent );
			view           = new SectionCollectionView( { 'collection' : collection });
		} );

		it( 'should be an instance of SectionCollectionView Compositeview', function () {
			expect( view ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have an item view ', function () {
			expect( view.getItemView( view.collection.models[0] ) ).to.not.be.equal( undefined );
		} );

	} );

} );