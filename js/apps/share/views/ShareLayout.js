define( function ( require ) {
	'use strict';

	require( 'jquery-placeholder' );

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!share/templates/ShareLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'className' : 'modal-dialog modal-md',

		'regions' : {
			'sharedContent' : '#shared-content',
			'searchResults' : '#share-search-results',
			'selectedItems' : '#selected-items'
		},

		'ui' : {
			'searchInput' : '.search-input',
			'searchClear' : '#search-clear',
			'shareButton' : '#share-btn',
			'message'     : '.message > textarea'
		},

		'events' : {
			'keyup @ui.searchInput' : 'onSearchKeyup',
			'click @ui.searchClear' : 'hideSearchClear'
		},

		'triggers' : {
			'click @ui.shareButton' : 'share'
		},

		'initialize' : function () {
			_.bindAll( this, 'onSearchKeyup' );
		},

		'onSearchKeyup' : _.debounce( function () {
			this.toggleSearchClear();
			this.trigger( 'search' );
		}, 500 ),

		'templateHelpers' : function () {
			return {
				'title'       : this.options.title,
				'placeholder' : this.options.placeholder
			};
		},

		'onShow' : function () {
			this.ui.searchInput.placeholder();
			this.ui.message.placeholder();
			this.toggleSearchClear();
		},

		'toggleSearchClear' : function () {
			this.ui.searchClear.toggle( Boolean( this.ui.searchInput.val() ) );
		},

		'hideSearchClear' : function () {
			this.ui.searchInput.val( '' ).focus();
			this.ui.searchClear.hide();
		}

	} );

} );
