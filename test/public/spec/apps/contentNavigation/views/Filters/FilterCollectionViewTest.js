define( function ( require ) {
	'use strict';

	// dependency modules
	var FilterCollectionView = require( 'contentNavigation/views/Filters/FilterCollectionView' );

	describe( 'FilterCollection View', function () {

		var filterCollectionView;

		before( function () {
			filterCollectionView = new FilterCollectionView ();
		} );

		after( function () {
			filterCollectionView = undefined;
		} );

		it( 'should have "itemView" ', function () {
			filterCollectionView.should.have.property( 'itemView' );
		} );

		it( 'should be wrapped around a <div> element ', function () {
			filterCollectionView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
