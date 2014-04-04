define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	// templates
	var template = require( 'text!videoPlayer/templates/share/shareVideoLayout.html' );

	// child views
	var SharedVideoItemView = require( 'videoPlayer/views/share/SharedVideoItemView' );
	var SelectedItemsView   = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'className' : 'modal-dialog',

		'regions' : {
			'sharedVideoRegion'   : '#shared-video',
			'searchResultsRegion' : '#search-results',
			'selectedItemsRegion' : '#selected-items'
		},

		'ui' : {
			'searchInput' : '#search-input',
			'shareButton' : '#share-btn'
		},

		'events' : {
			'keyup @ui.searchInput' : 'search',
			'click @ui.shareButton' : 'shareVideo'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.sharedVideoItemView = new SharedVideoItemView( {
				'model' : this.model
			} );

			this.selectedItemsView = new SelectedItemsView();
		},

		'onShow' : function () {
			this.sharedVideoRegion.show( this.sharedVideoItemView );
			this.selectedItemsRegion.show( this.selectedItemsView );
		},

		'search' : function () {},

		'shareVideo' : function () {}

	} );

} );
