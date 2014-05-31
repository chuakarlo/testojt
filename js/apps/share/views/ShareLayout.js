define( function ( require ) {
	'use strict';

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
			'shareButton' : '#share-btn',
			'message'     : '.message > textarea'
		},

		'events' : {
			'keyup @ui.searchInput' : 'onSearchKeyup'
		},

		'triggers' : {
			'click @ui.shareButton' : 'share'
		},

		'initialize' : function () {
			_.bindAll( this, 'onSearchKeyup' );
		},

		'onSearchKeyup' : _.debounce( function () {
			this.trigger( 'search' );
		}, 500 ),

		'templateHelpers' : function () {
			return {
				'title'       : this.options.title,
				'placeholder' : this.options.placeholder
			};
		}

	} );

} );
