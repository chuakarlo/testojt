define( function ( require ) {
	'use strict';

	var $                          = require( 'jquery' );
	var _                          = require( 'underscore' );
	var Marionette                 = require( 'marionette' );
	var App                        = require( 'App' );

	// Views
	var SearchResultCollectionView = require( 'search/views/SearchResultCollectionView' );
	var SearchNavCollectionView    = require( 'search/views/SearchNavCollectionView' );

	require( 'search/entities/search' );

	App.module( 'Search.Show', function ( Mod ) {

		// A base controller to inherit from which will close when the
		// layout closes
		Mod.BaseController = Marionette.Controller.extend( {

			'initialize' : function( options ) {
				this.layout = options.layout;
				this.listenTo( this.layout, 'close', function() {
					this.close();
				} );
			}

		} );


		Mod.NavController = Mod.BaseController.extend( {

			'initialize' : function() {

				// Call the parent init
				Mod.BaseController.prototype.initialize.apply(this, arguments);

				// create our nav collection
				this.navCollection = new App.Entities.SearchNavCollection();
				this.navCollection.set( [
					{
						'id'     : 'Users',
						'filter' : 'People'
					},
					{
						'id'     : 'Groups',
						'filter' : 'Groups'
					},
					{
						'id'     : 'Communities',
						'filter' : 'Communities'
					},
					{
						'id'     : 'Videos',
						'filter' : 'VideosCore'
					},
					{
						'id'     : 'All',
						'filter' : 'All'
					}
				] );

				this.showNav();
			},

			'setFilter' : function( filter ) {
				this.navCollection.setActive( filter );
			},

			'showNav' : function() {
				// Build the Nav view
				var searchNav = new SearchNavCollectionView( {
					collection : this.navCollection
				} );

				// Show the Nav
				this.layout.nav.show( searchNav );
			},

			'updateResultCount' : function(model, val) {
				this.navCollection.setResultCount( val );
			}

		} );

		Mod.ResultController =  Mod.BaseController.extend( {

			'initialize' : function() {

				// Call the parent init
				Mod.BaseController.prototype.initialize.apply(this, arguments);

				// Create our query model
				this.queryModel = new App.Entities.SearchQueryModel();

				// Create our search result collection
				this.searchCollection = new App.Entities.SearchCollection();

				// give the search collection a link to the queryModel
				this.searchCollection.queryModel = this.queryModel;
			},

			'setupInfiniteScroll' : function() {
				// When the window scroll bar gets to 200px from the bottom
				// of the window, fetch the next set of results.
				var that = this;

				var numFound = this.searchCollection.queryModel.get( 'numFound' );
				var start    = this.searchCollection.queryModel.get( 'start' );
				var rows     = this.searchCollection.queryModel.get( 'rows' );

				// check to see if we should continue setting up the smack
				// based on the number of results and stuff...
				if ( numFound > start && numFound > rows || !numFound && !start ) {
					$( window ).smack( {
						'threshold' : '200px'
					} )
						.done( function() {
							// Show Loading
							that.showLoading();
							// Reset starting point
							that.searchCollection.fetch( {
								'reset'   : false,
								'remove'  : false,
								'success' : function() {
									that.searchCollection.queryModel.updateStart();
									// TODO
									// check length of queryModel results here.
									that.setupInfiniteScroll();
									that.closeLoading();
								},
								'error' : function() {
									console.log('error');
								}
							});
						} );
				}

			},

			'showSearchResults' : function ( query, filter ) {
				// Set the query text
				this.layout.ui.query.html(query);

				// Clear any results we have
				this.searchCollection.reset();

				// Set the query and reset the starting position
				this.searchCollection.queryModel.set( {
					'searchData' : query,
					'start' : 0
				} );

				if ( !filter ) {
					filter = 'All';
				}

				this.searchCollection.queryModel.set( {
					'searchType' : filter
				} );

				// Show a loading view while we get some results
				this.showLoading();

				var searchCollectionView = new SearchResultCollectionView({
					'collection' : this.searchCollection
				});

				// Fetch the initial data
				this.searchCollection.fetch( {
					'remove'  : false,
					'success' : _.bind( function() {

						// Update the count first so inifite scroll knows if it
						// needs to setup
						this.searchCollection.queryModel.updateStart();

						this.layout.results.show(searchCollectionView);
						this.closeLoading();
						this.setupInfiniteScroll();

					}, this),
					'error' : function() {
						console.log('error');
					}
				} );
			},

			'showLoading' : function() {
				// Show a loading view
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : true,
					'text'       : 'Loading Results'
				} );
				this.layout.loading.show(loading);
			},

			'closeLoading' : function() {
				// Close the loading view
				this.layout.loading.close();
			},

			'onClose' : function() {
				// Make sure to stop the bum-smack
				$( window ).off( 'scroll.smack' );
			}

		} );

	} );

} );
