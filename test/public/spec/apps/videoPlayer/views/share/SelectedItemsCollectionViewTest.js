define( function ( require ) {
	'use strict';

	// test libraries
	var sinon         = window.sinon;
	var Backbone      = require( 'backbone' );
	var App           = require( 'App' );
	var SelectedItems = require( 'videoPlayer/collections/SelectedItemsCollection' );

	require( 'videoPlayer/VideoPlayer' );

	describe( 'SelectedItemsCollectionView', function () {

		var selectedItemsView;

		before( function () {
			selectedItemsView = new App.VideoPlayer.Views.SelectedItemsView( {
				'collection' : new SelectedItems()
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
