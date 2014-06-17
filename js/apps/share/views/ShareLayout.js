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
			'searchClear' : '#search-clear',
			'shareButton' : '#share-btn',
			'message'     : '.message > textarea'
		},

		'events' : {
			'focus @ui.searchInput' : 'onSearchKeyup',
			'keyup @ui.searchInput' : 'onSearchKeyup',
			'click @ui.searchClear' : 'hideSearchClear'
		},

		'triggers' : {
			'click @ui.shareButton' : 'share'
		},

		'initialize' : function () {
			_.bindAll( this, 'onSearchKeyup' );
		},

		'onSearchKeyup' : function ( e ) {
			e.preventDefault();
			e.stopPropagation();

			this.toggleSearchClear();

			var results = this.searchResults.currentView;

			if ( results ) {
				var items       = results.$el.children( 'li:not(.list-header)' );
				var firstItem   = items.filter( ':eq(0)' );
				var lastItem    = items.filter( ':eq(' + ( items.length  - 1 ) + ')' );
				var firstIdx    = 0;
				var lastIdx     = items.length - 1;
				var selected    = items.filter( '.selected' );
				var selectedIdx = items.index( selected );

				if ( items.length ) {
					var key = e.which || e.keyCode;

					switch ( key ) {
						case 38: // key up
						case 40: // key down
							var el;
							var container  = results.$el.parent();
							var listHeader = results.$el.find( '.list-header' );

							container.mouseout();

							if ( e.which === 38 ) { // key up
								el = ( selectedIdx === firstIdx ) ? lastItem : selected.prevAll( 'li:not(.list-header)' ).filter( ':eq(0)' );
							} else {
								el = ( selectedIdx === lastIdx ) ? firstItem : selected.nextAll( 'li:not(.list-header)' ).filter( ':eq(0)' );
							}

							// toggle highlighted item
							selected.removeClass( 'selected' );
							el.addClass( 'selected' );

							// scroll to highlighted item
							var diff = ( listHeader[ 0 ].scrollHeight * listHeader.length ) + ( listHeader[ 0 ].scrollHeight / 2 );
							container.scrollTop( selected.offset().top - container.offset().top + container.scrollTop() - diff );
							break;

						// enter
						case 13:
							this.getSelectedModel( selectedIdx );

							break;

						default: {
							this.debouncedSearch();
						}
					}
				} else {
					this.debouncedSearch();
				}
			} else {
				this.debouncedSearch();
			}
		},

		'debouncedSearch' : _.debounce( function () {
			this.trigger( 'search' );
		}, 500 ),

		'getSelectedModel' : function ( idx ) {
			var collection = this.searchResults.currentView.collection;

			var models = collection.reject( function ( model ) {
				return model.id === undefined;
			} );

			this.trigger( 'share:selectedItem', models[ idx ] );
		},

		'templateHelpers' : function () {
			return {
				'title'       : this.options.title,
				'placeholder' : this.options.placeholder
			};
		},

		'onShow' : function () {
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
