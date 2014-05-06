define( function ( require ) {
	'use strict';

	// libraries
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );

	// view template
	var template = require( 'text!videoPlayer/templates/share/shareVideoLayout.html' );

	// collections
	var SelectedItems = require( 'videoPlayer/collections/SelectedItemsCollection' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),
		'className' : 'modal-dialog',

		'regions' : {
			'sharedVideoRegion'   : '#shared-video',
			'searchResultsRegion' : '#search-results',
			'selectedItemsRegion' : '#selected-items'
		},

		'ui' : {
			'searchInput' : '.search-input',
			'shareButton' : '#share-btn',
			'message'     : '.message > textarea'
		},

		'events' : {
			'keyup @ui.searchInput' : 'search',
			'click @ui.searchInput' : 'selectText',
			'click @ui.shareButton' : 'shareVideo'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.selectedItems = new SelectedItems();

			// object for holding personnels, groups and message for sharing
			this.shareTargets = {
				'personnels' : [ ],
				'groups'     : [ ],
				'message'    : ''
			};

			// common loading instance
			this.loadingView = new App.Common.LoadingView( {
				'background' : true,
				'size'       : 'small'
			} );

			// selected search items view
			this.selectedItemsView = new App.VideoPlayer.Views.SelectedItemsView( {
				'collection' : this.selectedItems
			} );

			// listen for click events on the body to hide the search results
			this.listenTo( App.vent, 'videoPlayer:click:body', this.hideSearchResults );

			// listen for select item event
			this.listenTo( App.vent, 'videoPlayer:share:item:selected', this.selectItem );

			// listen for selected items add/remove events
			this.listenTo( this.selectedItems, 'add remove', this.setShareBtnState );
		},

		'onShow' : function () {
			this.selectedItemsRegion.show( this.selectedItemsView );
		},

		'selectText' : function () {
			this.ui.searchInput.select();
		},

		'search' : function () {
			var treeData = [ ];
			var filter   = this.ui.searchInput.val().trim();

			if ( this.ui.searchInput.val().trim() !== '' ) {

				// show loading view
				this.searchResultsRegion.show( this.loadingView );

				// debounce search for 250 milliseconds
				this._debouncedSearch = _.debounce( function () {

					var doSearch = App.request( 'videoPlayer:searchPeopleAndGroups', filter );

					App.when( doSearch ).done( function ( results ) {
						_.each( _.keys( results[ 0 ] ), function ( key ) {
							if ( !_.isEmpty( results[ 0 ][ key ] ) ) {
								treeData.push( {
									'nodeName' : key,
									'nodes'    : results[ 0 ][ key ]
								} );
							}
						} );

						var tree     = new App.VideoPlayer.Entities.TreeNodeCollection( treeData );
						var treeRoot = new App.VideoPlayer.Views.SearchResultsTreeRoot( { 'collection' : tree } );

						// show search results
						this.searchResultsRegion.show( treeRoot );
					}.bind( this ) );

				}, 250 ) || this._debouncedSearch;

				return this._debouncedSearch();
			} else {
				this.searchResultsRegion.close();
			}
		},

		'selectItem' : function ( itemView ) {
			// set dynamic model id to prevent the same item to be added to the selection
			itemView.model.set( 'id', this._getItemId( itemView.model ) );

			this.selectedItems.add( itemView.model );
			this.ui.searchInput.val( this._getItemName( itemView.model ) );
			this.hideSearchResults();
			this.ui.searchInput.blur();
		},

		'hideSearchResults' : function ( event ) {
			if ( !_.isUndefined( event ) &&
				$( event.target ).hasClass( 'search-input' ) ) {
				return;
			}

			this.searchResultsRegion.close();
		},

		'setShareBtnState' : function () {
			var disable = this.selectedItems.length === 0 ? true : false;

			this.ui.shareButton.attr( {
				'disabled' : disable
			} );
		},

		'shareVideo' : function () {
			// get the share message
			this.shareTargets.message = this.ui.message.val();

			// group items into personnels and groups
			this._filterItems();

			var share = App.request( 'videoPlayer:share:video', this.shareTargets );

			$.when( share ).done( function ( response ) {
				if ( response[ 0 ] === 200 ) {
					App.modalRegion.close();
				}
			} );
		},

		'_filterItems' : function () {
			// empty the personnels and groups
			this.shareTargets.personnels.length = 0;
			this.shareTargets.groups.length     = 0;

			_.each( this.selectedItems.models, function ( model ) {
				if ( this._isPersonnel( model ) ) {
					this.shareTargets.personnels.push( model.get( 'PersonnelId' ) );
				} else {
					this.shareTargets.groups.push( model.get( 'LicenseId' ) );
				}
			}.bind( this ) );
		},

		'_getItemId' : function ( model ) {
			if ( this._isPersonnel( model ) ) {
				return model.get( 'PersonnelId' );
			} else {
				return model.get( 'LicenseId' );
			}
		},

		'_getItemName' : function ( model ) {
			if ( this._isPersonnel( model ) ) {
				return model.get( 'FirstName' ) + ' ' + model.get( 'LastName' );
			} else {
				return model.get( 'LicenseName' );
			}
		},

		// check if an item is a personnel or else it's a group
		'_isPersonnel' : function ( model ) {
			if ( model.get( 'PersonnelId' ) ) {
				return true;
			} else {
				return false;
			}
		}

	} );

} );
