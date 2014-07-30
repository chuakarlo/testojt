define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Ladda      = require( 'ladda' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var resources  = require( 'resources/data/menus' );
	var utils      = require( 'videoPlayer/utils/utils' );

	var ShareModal      = require( 'share/views/ShareLayout' );
	var CommunitiesView = require( 'share/views/CommunitiesView' );
	var LumibookView    = require( 'share/views/LumiBookView' );
	var VideoView       = require( 'share/views/VideoView' );

	var ShareModel                  = require( 'share/entities/Share' );
	var SearchResultsCollection     = require( 'share/entities/SearchResultsCollection' );
	var SearchResultsCollectionView = require( 'share/views/SearchResultsCollectionView' );
	var SelectedItemsCollectionView = require( 'share/views/SelectedItemsCollectionView' );

	var baseUrl = window.location.protocol + '//' + window.location.host + '/';

	var lumibookUrl    = baseUrl + resources.lumibook.url;
	var communitiesUrl = baseUrl + resources.communities.url;

	var Controller = Marionette.Controller.extend( {

		'createModal' : function ( options, contentView ) {
			var shareModal = new ShareModal( options );
			this.shareModal = shareModal;

			// create a collection to store selected users/groups
			this.selectedItems = new Backbone.Collection();
			this.listenTo( this.selectedItems, 'add remove', this.setShareBtnState );

			this.listenTo( shareModal, 'search', this.search );
			this.listenTo( shareModal, 'share', this.share );
			this.listenTo( shareModal, 'close', this.close );

			// show the modal
			App.modalRegion.show( shareModal, { 'className' : 'share-modal' } );

			// create a selected items view
			var selectedItemsView = new SelectedItemsCollectionView( { 'collection' : this.selectedItems } );

			// listen for the removal of a person/group
			this.listenTo( selectedItemsView, 'itemview:item:remove', this.removeItem );

			// listen for the selection of either a group or person
			this.listenTo( shareModal, 'share:selectedItem', this.selectItem );

			// show the selected items, will auto populate when adding/removing
			shareModal.selectedItems.show( selectedItemsView );

			// show the content being shared, lumibook, video or community
			shareModal.sharedContent.show( contentView );
		},

		'share' : function () {
			if ( !this.selectedItems.length ) {
				return;
			}

			var groups       = [ ];
			var persons      = [ ];
			var licenseIds   = [ ];
			var personnelIds = [ ];

			var message = this.shareModal.ui.message.val() + ' ' + this.url;

			// split the selectedItems array into two arrays, persons and groups
			this.selectedItems.each( function ( elem ) {
				( elem.isPerson() ? persons : groups ).push( elem );
			} );

			// get the personnel ids to share to
			_.each( persons, function ( person ) {
				personnelIds.push( person.get( 'PersonnelId' ) );
			} );

			// get the license ids to share to
			_.each( groups, function ( group ) {
				licenseIds.push( group.get( 'LicenseId' ) );
			} );

			var l = Ladda.create( document.querySelector( '#share-btn' ) );
			l.start();

			// replace new line with space to prevent
			// unauthorized response from the server
			var x = new ShareModel( {
				'licenseIds'   : licenseIds.join( ',' ),
				'personnelIds' : personnelIds.join( ',' ),
				'message'      : _.unescape( utils.safeStringify( message ).replace( /\n/g, ' ' ) )
			} );

			x.save( null, {
				'success' : this.shareSuccess,
				'error'   : this.shareFailure
			} );
		},

		'shareSuccess' : function () {
			App.modalRegion.close();

			App.vent.trigger( 'flash:message', {
				'message' : 'Your message has been shared',
				'type'    : 'success'
			} );
		},

		'shareFailure' : function () {
			App.modalRegion.close();

			App.errorHandler( new Error( 'An error occurred and your message could not be shared' ) );
		},

		'setShareBtnState' : function () {
			var disabled = this.selectedItems.length === 0;

			this.shareModal.ui.shareButton.attr( 'disabled', disabled );
		},

		'selectItem' : function ( args ) {
			// add the selected item to the list
			this.selectedItems.add( args.model ? args.model : args );

			// remove body click handler that would hide search results
			this.clearClickBinding();

			// clear search input
			this.shareModal.ui.searchInput.val( '' );
			this.shareModal.hideSearchClear();
		},

		'removeItem' : function ( view ) {
			this.selectedItems.remove( view.model );
		},

		'closeSearchResults' : function () {
			if ( !_.isUndefined( this.shareModal.searchResults ) ) {
				this.shareModal.searchResults.close();
			}
		},

		'addClickBinding' : function () {
			$( 'body' ).bind( 'click.shareVideoDialog', this.clearClickBinding.bind( this ) );
		},

		'clearClickBinding' : function () {
			this.closeSearchResults();
			$( 'body' ).unbind( 'click.shareVideoDialog' );
		},

		'search' : function () {
			var searchTerms = this.shareModal.ui.searchInput.val();
			// Remove characters that cause errors in search
			searchTerms = searchTerms.replace( /:|\\|\/|\{|\}|\(|\)|\[|\]/gi, '' );

			if ( searchTerms.trim() !== '' ) {

				// show a loading view while we wait for search results
				this.shareModal.searchResults.show( new App.Common.LoadingView( { 'background' : true, 'size' : 'small' } ) );

				var searching   = App.request( 'shareModal:searchPeopleAndGroups', searchTerms );

				App.when( searching ).done( this.doneSearching.bind( this ) ).fail( this.failSearching.bind( this ) );

			} else {
				this.shareModal.searchResults.close();
			}

		},

		'doneSearching' : function ( searchResults ) {
			// get received data that has either personnelid, licenseid or title
			var filtered = _.filter( searchResults.models, function ( child ) {
				return child.get( 'PersonnelId' ) || child.get( 'LicenseId' ) || child.get( 'title' );
			} );

			searchResults = new SearchResultsCollection( filtered, { 'searchData' : searchResults.searchData } );

			// create a view for the search results
			var resultsView = new SearchResultsCollectionView( { 'collection' : searchResults } );

			// listen for the selection of either a group or person
			this.listenTo( resultsView, 'itemview:share:selectedItem', this.selectItem );

			// show the search results
			if ( !_.isUndefined( this.shareModal.searchResults ) ) {
				this.shareModal.searchResults.show( resultsView );
			}

			// add click binding to close search results
			this.addClickBinding();
		},

		'failSearching' : function () {
			this.closeSearchResults();

			App.errorHandler( {
				'region'   : this.shareModal.searchResults,
				'viewText' : 'An error occurred while searching',
				'message'  : false
			} );
		},

		'showModal' : function ( options ) {
			var modalOptions;
			var view;
			var url;

			if ( !options.type ) {
				return;
			}

			switch ( options.type ) {
				case 'lumiBook':
					modalOptions = {
						'placeholder' : 'Say something about the LumiBook section...',
						'title'       : 'Share this LumiBook Section'
					};

					url = lumibookUrl + '/' + options.data.lumiBookId + '/' + options.data.lumiBookItemId;

					view = new LumibookView( {
						'title' : options.data.title || 'LumiBook',
						'url'   : url
					} );

					// store the url for if user selects share
					this.url = url;
					break;

				case 'community':
					modalOptions = {
						'placeholder' : 'Say something about the Communities thread...',
						'title'       : 'Share this Communities Thread'
					};

					url = communitiesUrl + '/' + options.data.locationTypeId;

					if ( options.data.locationTypeId ) {
						url += '/' + options.data.locationId;
					}
					if ( options.data.threadId ) {
						url += '/' + options.data.threadId;
					}
					if ( options.data.postId ) {
						url += '/' + options.data.postId;
					}

					view = new CommunitiesView( {
						'title' : options.data.title || 'Community',
						'url'   : url
					} );

					// store the url for if user selects share
					this.url = url;
					break;

				default: {
					modalOptions = {
						'placeholder' : 'Say something about the video...',
						'title'       : 'Share this Video'
					};

					view = new VideoView( {
						'model' : options.data.model
					} );

					// store the url for if user selects share
					this.url = options.data.model.get( 'VideoUrl' );
				}
			}

			this.createModal( modalOptions, view );
		}

	} );

	var API = {

		'getSearchResults' : function ( searchData ) {
			var defer   = App.Deferred();
			var results = new SearchResultsCollection( [ ], { 'searchData' : searchData } );

			results.fetch( {

				'success' : function () {
					defer.resolve( results );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching search results' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'shareModal:searchPeopleAndGroups', API.getSearchResults );

	var controller = new Controller();

	window.showSharedModal = controller.showModal.bind( controller );

} );
