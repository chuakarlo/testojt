define( function ( require ) {
	'use strict';

	var $            = require( 'jquery' );
	var _            = require( 'underscore' );
	var Marionette   = require( 'marionette' );
	var App          = require( 'App' );
	var stripHtml    = require( 'common/helpers/stripHtml' );
	var stripScripts = require( 'common/helpers/stripScripts' );

	// Views
	var SearchResultCollectionView = require( 'search/views/SearchResultCollectionView' );
	var SearchNavCollectionView    = require( 'search/views/SearchNavCollectionView' );
	var EmptyResultView            = require( 'search/views/EmptyResultView' );

	require( 'search/entities/search' );

	App.module( 'Search.Show', function ( Mod ) {

		// A base controller to inherit from which will close when the
		// layout closes
		Mod.BaseController = Marionette.Controller.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.listenTo( this.layout, 'close', function () {
					this.close();
				} );
			}

		} );

		Mod.NavController = Mod.BaseController.extend( {

			'initialize' : function () {

				// Call the parent init
				Mod.BaseController.prototype.initialize.apply( this, arguments );

				// create our nav collection
				this.navCollection = new App.Entities.SearchNavCollection();
				this.navCollection.set( [
					{
						'id'     : 'Groups',
						'filter' : 'Groups',
						'query'  : this.options.query
					},
					{
						'id'     : 'Communities',
						'filter' : 'Communities',
						'query'  : this.options.query
					},
					{
						'id'     : 'Videos',
						'filter' : 'VideosAll',
						'query'  : this.options.query
					},
					{
						'id'     : 'All',
						'filter' : 'All',
						'query'  : this.options.query
					}
				] );

				this.showNav();
			},

			'setFilter' : function ( filter ) {
				this.navCollection.setActive( filter );
			},

			'showNav' : function () {
				// Build the Nav view
				var searchNav = new SearchNavCollectionView( {
					collection : this.navCollection
				} );

				// Show the Nav
				this.layout.nav.show( searchNav );
			},

			'updateResultCount' : function ( model, val ) {
				this.navCollection.setResultCount( val );
			}

		} );

		Mod.ResultController =  Mod.BaseController.extend( {

			'initialize' : function () {
				// Call the parent init
				Mod.BaseController.prototype.initialize.apply( this, arguments );

				// Create our query model
				this.queryModel = new App.Entities.SearchQueryModel();

				// Create our search result collection
				this.searchCollection = new App.Entities.SearchCollection();

				// give the search collection a link to the queryModel
				this.searchCollection.queryModel = this.queryModel;

				this.listenTo( this.searchCollection, 'add', this.setModelQueue );
			},

			'setModelQueue' : function ( model ) {
				if ( model.isVideo ) {
					model.setQueue( this.options.queueContentsIds );
				}
			},

			'setupInfiniteScroll' : function ( filter ) {
				// When the window scroll bar gets to 200px from the bottom
				// of the window, fetch the next set of results.
				var that     = this;
				var numFound = this.searchCollection.queryModel.get( 'numFound' );
				var start    = this.searchCollection.queryModel.get( 'start' );
				var rows     = this.searchCollection.queryModel.get( 'rows' );

				// check to see if we should continue setting up the smack
				// based on the number of results and stuff...
				if ( numFound > start && numFound > rows || !numFound && !start ) {
					$( window ).smack( {
						'threshold' : '200px'
					} ).done( function () {
						// Show Loading
						that.showLoading();

						// Reset starting point
						that.searchCollection.fetch( {
							'filter' : filter,
							'reset'  : false,
							'remove' : false,

							'success' : function ( args ) {
								that.searchCollection.queryModel.updateStart();
								that.setupInfiniteScroll( filter );
								that.closeLoading();
							},

							'error' : App.errorHandler.bind( new Error( 'There was a problem loading your search results. Please try again later.' ) )
						} );
					} );
				}
			},

			'showSearchResults' : function ( query, filter ) {
				// Show empty results if no query was passed
				if ( !query || !query.replace( /\s/g, '' ).length ) {
					this.showEmptyResult();
					return;
				}

				// Set the query text, but remove html and scripts
				this.layout.ui.query.html( stripScripts( stripHtml( query ) ) );

				// Set the query text, but remove html
				this.layout.ui.query.html( stripHtml( query ) );

				// Clear any results we have
				this.searchCollection.reset();

				// Remove characters that cause errors in search
				query = query.replace( /:|\\|\/|\{|\}|\(|\)|\[|\]/gi, ' ' );

				// Set the query and reset the starting position
				this.searchCollection.queryModel.set( {
					'searchData' : query,
					'start'      : 0
				} );

				if ( !filter ) {
					filter = 'All';
				}

				this.searchCollection.queryModel.set( {
					'searchType' : filter
				} );

				var searchCollectionView = new SearchResultCollectionView( {
					'collection' : this.searchCollection
				} );

				// Show a loading view while we get some results
				this.showLoading();

				// Fetch the initial data
				this.searchCollection.fetch( {
					'filter'  : filter,
					'remove'  : false,
					'success' : _.bind( function () {

						this.closeLoading();

						// Update the count first so inifite scroll knows if it
						// needs to setup
						this.searchCollection.queryModel.updateStart();

						this.layout.results.show( searchCollectionView );
						this.setupInfiniteScroll( filter );
					}, this ),

					'error' : function () {
						this.closeLoading();

						App.errorHandler( new Error( 'There was a problem loading your search results. Please try again later.' ) );
					}.bind( this )
				} );
			},

			'showLoading' : function () {
				// Hide any error message
				App.flashMessage.close();

				// Show a loading view
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Results'
				} );
				this.layout.loading.show( loading );
			},

			'showEmptyResult' : function () {
				this.layout.results.show( new EmptyResultView() );
			},

			'closeLoading' : function () {
				// Close the loading view
				this.layout.loading.close();
			},

			'onClose' : function () {
				// Make sure to stop the bum-smack
				$( window ).off( 'scroll.smack' );
			}

		} );

	} );

} );
