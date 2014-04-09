define( function ( require ) {
	'use strict';

	// libraries
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var async      = require( 'async' );
	var Session    = require( 'Session' );

	// view template
	var template = require( 'text!videoPlayer/templates/share/shareVideoLayout.html' );

	// child views
	var SharedVideoItemView  = require( 'videoPlayer/views/share/SharedVideoItemView' );
	var SearchResultsLayout  = require( 'videoPlayer/views/share/SearchResultsLayout' );
	var PeopleCollectionView = require( 'videoPlayer/views/share/PeopleCollectionView' );
	var GroupsCollectionView = require( 'videoPlayer/views/share/GroupsCollectionView' );
	var SelectedItemsView    = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );

	// collections
	var GroupsCollection = require( 'videoPlayer/collections/GroupsCollection' );
	var PeopleCollection = require( 'videoPlayer/collections/PeopleCollection' );
	var SelectedItems    = require( 'videoPlayer/collections/SelectedItemsCollection' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

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
			'focus @ui.searchInput' : 'showSearchResults',
			'keyup @ui.searchInput' : 'search',
			'click @ui.searchInput' : 'selectText',
			'click @ui.shareButton' : 'shareVideo'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.sharedVideoItemView = new SharedVideoItemView( {
				'model' : this.model
			} );

			// instantiate collections
			this.groupsCollection = new GroupsCollection();
			this.peopleCollection = new PeopleCollection();
			this.selectedItems    = new SelectedItems();

			// selected search items view
			this.selectedItemsView    = new SelectedItemsView( {
				'collection' : this.selectedItems
			} );

			// people search results collection views
			this.peopleCollectionView = new PeopleCollectionView( {
				'collection' : this.peopleCollection
			} );

			// group search results collection views
			this.groupsCollectionView = new GroupsCollectionView( {
				'collection' : this.groupsCollection
			} );

			this.searchResultsLayout  = new SearchResultsLayout( {
				'peopleCollectionView' : this.peopleCollectionView,
				'groupsCollectionView' : this.groupsCollectionView
			} );

			// listen for click events on the body to hide the search results
			this.listenTo( Vent, 'videoPlayer:click:body', this.hideSearchResults );

			// re-render search results on collection reset
			this.listenTo( this.peopleCollection, 'reset', this.peopleCollectionView.render );
			this.listenTo( this.groupsCollection, 'reset', this.groupsCollectionView.render );

			// listen for click events on the search results items
			this.listenTo( this.peopleCollectionView, 'itemview:person:selected', this.selectItem );
			this.listenTo( this.groupsCollectionView, 'itemview:group:selected', this.selectItem );

			this.listenTo( this.selectedItems, 'add remove', this.setShareBtnState );
		},

		'onShow' : function () {
			this.sharedVideoRegion.show( this.sharedVideoItemView );
			this.selectedItemsRegion.show( this.selectedItemsView );
		},

		'selectText' : function ( event ) {
			this.ui.searchInput.select();
		},

		'search' : function ( event ) {
			event.preventDefault();
			event.stopPropagation();

			var self = this;

			if ( this.ui.searchInput.val().trim() !== '' ) {
				this._debounceSearch = _.debounce( function () {
					return async.parallel( [
						self.searchPeople,
						self.searchGroups
					], function ( error, results ) {
						if ( !error ) {
							self.peopleCollection.reset( _.rest( results[ 0 ] ) );
							self.groupsCollection.reset( _.rest( results[ 1 ] ) );
						}
					} );
				}, 200 ) || this._debounceSearch;

				return this._debounceSearch();
			} else {
				return false;
			}
		},

		'parallelSearch' : function () {

		},

		'searchPeople' : function ( callback ) {
			var request = {
				'method' : 'RespondSearchAPI',
				'args'   : {
					'persId'     : Session.personnelId(),
					'start'      : 0,
					'rows'       : 24,
					'searchType' : 'People',
					'searchData' : this.ui.searchInput.val().trim(),
					'sort'       : 'created desc'
				}
			};

			var options = {
				'success' : function ( response ) {
					if ( response[ 0 ].length > 1 ) {
						return callback( null, response[ 0 ] );
					} else {
						return callback( null, [] );
					}
				},
				'error' : function ( error ) {
					return callback( error );
				}
			};

			return this.peopleCollection.fetch( request, options );
		},

		'searchGroups' : function ( callback ) {
			var request = {
				'method' : 'RespondSearchAPI',
				'args'   : {
					'persId'     : Session.personnelId(),
					'start'      : 0,
					'rows'       : 24,
					'searchType' : 'Groups',
					'searchData' : this.ui.searchInput.val().trim(),
					'sort'       : 'created desc'
				}
			};

			var options = {
				'success' : function ( response ) {
					if ( response[ 0 ].length > 1 ) {
						return callback( null, response[ 0 ] );
					} else {
						return callback( null, [] );
					}
				},
				'error' : function ( error ) {
					return callback( error );
				}
			};

			return this.groupsCollection.fetch( request, options );
		},

		'showSearchResults' : function ( event ) {
			this.peopleCollection.reset();
			this.groupsCollection.reset();

			this.searchResultsRegion.show( this.searchResultsLayout );
		},

		'selectItem' : function ( itemView ) {
			this.selectedItems.add( itemView.model );
			this.ui.searchInput.val( itemView.model.get( 'Name' ) );
			this.hideSearchResults();
			this.ui.searchInput.blur();
		},

		'hideSearchResults' : function ( event ) {
			if ( !_.isUndefined( event ) &&
				$( event.target ).hasClass( 'search-input' ) )
			{
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

		'shareVideo' : function () {}

	} );

} );
