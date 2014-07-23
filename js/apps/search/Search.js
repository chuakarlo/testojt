define( function ( require ) {
	'use strict';

	return function () {

		var _                   = require( 'underscore' );
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

					var queueContentsRequest = App.request( 'common:getQueueContents' );

					App.when( queueContentsRequest ).done( function ( queueContents ) {

						// get all queue contents ids
						var queueContentsIds = [ ];
						_.each( queueContents.models, function ( model ) {
							queueContentsIds.push( model.id );
						} );

						if ( !this.layout ) {
							this.layout = new SearchResultsLayout();
							App.content.show( this.layout );

							this.listenTo( this.layout, 'close', this.destroyControllers );
						}

						if ( !this.resultController ) {
							this.resultController = new Search.Show.ResultController( {
								'layout'           : this.layout,
								'queueContentsIds' : queueContentsIds
							} );

							// The Nav needs to know how many results were in the
							// query
							this.listenTo(
								this.resultController.queryModel,
								'change:numFound',
								this.updateResultCount
							);
						} else {
							// pass updated of queue list to the controller.
							this.resultController.options.queueContentsIds = queueContentsIds;
						}

						// update navController if one doesn't exist or the query param changes
						if ( !this.navController || this.navController.query !== query ) {
							this.navController = new Search.Show.NavController( {
								'layout' : this.layout,
								'query'  : query
							} );
						}

						this.navController.setFilter( filter );
						this.resultController.showSearchResults( query, filter );
					}.bind( this ) );
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
