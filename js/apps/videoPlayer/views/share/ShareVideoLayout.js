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
			'shareButton' : '#share-btn'
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

					$.when( doSearch ).done( function ( results ) {
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
			//TODO: implement video sharing
		},

		'_getItemId' : function ( model ) {
			if ( model.get( 'LicenseId' ) ) {
				return model.get( 'LicenseId' );
			} else {
				return model.get( 'PersonnelId' );
			}
		},

		'_getItemName' : function ( model ) {
			if ( model.get( 'LicenseName' ) ) {
				return model.get( 'LicenseName' );
			} else {
				return model.get( 'FirstName' ) + ' ' + model.get( 'LastName' );
			}
		}

	} );

} );
