define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var SelectedItemsView       = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );
	var SelectedItemsCollection = require( 'videoPlayer/collections/SelectedItemsCollection' );
	var PersonModel             = require( 'videoPlayer/models/PersonModel' );

	describe( 'SelectedItemsCollectionView', function () {

		var selectedItemsView;

		before( function () {
			selectedItemsView = new SelectedItemsView( {
				'collection' : new SelectedItemsCollection()
			} );
		} );

		after( function () {
			selectedItemsView = undefined;
		} );

		it( 'does have a `tagName` property', function () {
			selectedItemsView.should.have.property( 'tagName' );
		} );

		it( 'does have an `itemView` property', function () {
			selectedItemsView.should.have.property( 'itemView' );
		} );

		describe( '`.itemViewRemove`', function () {

			var selectedItemView = {
				'model' : new PersonModel( {
					'FirstName'    : 'John',
					'LastName'     : 'Doe',
					'DistrictName' : 'Salt Lake City',
					'State'        : 'UT'
				} )
			};

			before( function () {
				selectedItemsView.collection.reset();
				selectedItemsView.collection.add( selectedItemView.model );
			} );

			it( 'does remove the item from the collection', function () {
				selectedItemsView.collection.should.have.length( 1 );
				selectedItemsView.itemViewRemove( selectedItemView );
				selectedItemsView.collection.should.have.length( 0 );
			} );

		} );

	} );

} );
