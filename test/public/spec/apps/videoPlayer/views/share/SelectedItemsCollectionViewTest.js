define( function ( require ) {
	'use strict';

	// test libraries
	var Backbone          = require( 'backbone' );
	var SelectedItemsView = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );

	describe( 'SelectedItemsCollectionView', function () {

		var selectedItemsView;

		before( function () {
			selectedItemsView = new SelectedItemsView( {
				'collection' : new Backbone.Collection()
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

			var Person   = Backbone.Model.extend();
			var itemView = {
				'model' : new Person( {
					'FirstName'    : 'John',
					'LastName'     : 'Doe',
					'DistrictName' : 'Salt Lake City',
					'State'        : 'UT'
				} )
			};

			before( function () {
				selectedItemsView.collection.reset();
				selectedItemsView.collection.add( itemView.model );
			} );

			it( 'does remove the item from the collection', function () {
				selectedItemsView.collection.should.have.length( 1 );
				selectedItemsView.itemViewRemove( itemView );
				selectedItemsView.collection.should.have.length( 0 );
			} );

		} );

	} );

} );
