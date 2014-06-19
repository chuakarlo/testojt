define( function ( require ) {
	'use strict';

	return function () {

		var AuthRouter          = require( 'AuthRouter' );
		var Marionette          = require( 'marionette' );
		var App                 = require( 'App' );
		var SearchResultsLayout = require( 'search/views/SearchResultsLayout' );

		// ## Search App
		App.module( 'Search', function ( Search ) {

			// load search
			require( 'search/controllers/showController' );

			// configure search routes
			Search.Router = AuthRouter.extend( {

				'appRoutes' : {
					'search'                : 'showSearchResults',
					'search/:filter/*query' : 'showSearchResults'
				}

			} );

			var SearchController = Marionette.Controller.extend( {

				'destroyControllers' : function () {
					// Clear the reference of these to be GC
					this.navController = null;
					this.resultController = null;
					this.layout = null;
				},

				'showSearchResults' : function ( filter, query ) {
					// Make sure to hide anything flash
					App.request( 'pd360:hide' );

					if ( !this.layout ) {
						this.layout = new SearchResultsLayout();
						App.content.show(this.layout);

						this.listenTo( this.layout, 'close', this.destroyControllers );
					}

					if ( !this.resultController ) {
						this.resultController = new Search.Show.ResultController( {
							'layout' : this.layout
						} );

						// The Nav needs to know how many results were in the
						// query
						this.listenTo(
							this.resultController.queryModel,
							'change:numFound',
							this.updateResultCount
						);
					}

					if ( !this.navController ) {
						this.navController = new Search.Show.NavController( {
							'layout' : this.layout
						} );
					}

					this.navController.setFilter( filter );
					this.resultController.showSearchResults( query, filter );
				},

				'updateResultCount' : function ( model, val ) {
					this.navController.updateResultCount( model, val );
				}

			} );

			var API = new SearchController();

			App.addInitializer( function () {
				new Search.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
