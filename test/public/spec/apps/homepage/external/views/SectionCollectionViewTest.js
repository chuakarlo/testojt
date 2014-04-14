define( function ( require ) {
	'use strict';

	var Marionette            = require( 'marionette' );
	var expect                = require( 'chai' ).expect;

	describe( 'SectionCollectionView CollectionView', function () {

		before ( function () {
			var SectionCollectionView = require( 'external/views/SectionCollectionView' );
			var SectionCollection     = require( 'external/collections/SectionCollection' );
			var parent                = [];
			require( 'external/external/what-to-do-next/base' ).register( parent, {} );

			var collection = new SectionCollection ( parent );

			this.view = new SectionCollectionView( { 'collection' : collection });
		} );

		it( 'should be an instance of SectionCollectionView Compositeview', function () {
			expect( this.view ).to.be.an.instanceof( Marionette.CollectionView );
		} );

		it( 'should have an item view ', function () {
			expect( this.view.getItemView( this.view.collection.models[0] ) ).to.not.be.equal( undefined );
		} );

	} );

} );