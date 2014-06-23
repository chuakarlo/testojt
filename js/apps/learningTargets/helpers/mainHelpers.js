define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var $               = require( 'jquery' );
	var Backbone        = require( 'backbone' );

	var MainView        = require( 'apps/learningTargets/views/MainView' );
	var ProcessesView   = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var DescriptionView = require( 'apps/learningTargets/views/catalogs/DescriptionView' );

	var setLegacyPages  = require( '../helpers/setLegacyPages' );

	var mainView;
	var currentPage;
	var legendRegion;
	var contentRegion;

	return function ( Main ) {

		Main.helper = {
			'_showView' : function ( view ) {
				legendRegion.reset();
				contentRegion.show( view );
			},

			'_showLegend' : function ( view ) {
				legendRegion.show( view );
			},

			'_setContent' : function ( content, options ) {
				var self = this;
				// hide pd360 flash

				App.request( 'pd360:hide' );
				// show main view
				if ( !mainView ) {
					mainView = new MainView();
					mainView.on( 'lt:viewall', self.handleViewallLink.bind( self ) );
				}

				App.content.show( mainView );

				contentRegion = new Main.regions.Content( {
					el : mainView.el.querySelector( '.lt-content' )
				} );

				legendRegion = new Main.regions.Legend( {
					el :  mainView.el.querySelector( '.lt-legend' )
				} );

				mainView.setupViewAllButton( content );
				self.setupViewAllLink( content );
				mainView.activateTab( content );
			},

			'capitalise' : function ( string ) {
				return string.charAt( 0 ).toUpperCase() + string.slice( 1).toLowerCase();
			},

			'_apiRequest' : function ( type, callback, options ) {
				var request = App.request( type, options );

				App.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function () {
					var pathArray             = window.location.hash.split( '/' );
					var learningTargetsModule = Main.helper.capitalise( pathArray[ 2 ] );
					var errorMessage          = 'There was an error loading in ' + learningTargetsModule + '.';

					Main.helper._showView( new App.Common.ErrorView( {
						'message' : errorMessage,
						'flash'   : 'An error occurred. Please try again later.'
					} ) );

				} );
			},

			'redirectToLegacyPage' : function ( target, page, sub, opts ) {
				App.navigate( Backbone.history.fragment + '/legacy' );

				Main.helper.showLegacyContent( page, sub, opts );
			},

			'showLegacyContent' : function ( page, sub, opts ) {
				var pd360Loaded = App.request( 'pd360:loaded' );

				// Display loading view
				App.content.show( new App.Common.LoadingView() );

				// navigate to legacy page
				App.when( pd360Loaded ).done( function () {
					App.content.show( new ProcessesView() );
					$( '.content-wrapper' ).html( '' );
					App.request( 'pd360:navigate', page, sub, opts );
				} );
			},

			'handleViewallLink' : function ( view ) {
				var self = this;
				self.redirectToLegacyPage( view, currentPage.page, currentPage.subPage );
			},

			'setupViewAllLink' : function ( content ) {
				currentPage = setLegacyPages( content );
			},

			'showTrainingCatalog' : function ( view ) {

				if ( $.browser.safari && $.browser.android ) {
					$('#modal-content').attr('data-backdrop','static');
				}

				var descriptionView = new DescriptionView( );

				if ( view.model.get( 'CatalogResourceTypeId' ) === 3 ) {
					Main.helper._apiRequest( 'lt:description', function ( collection ) {

						descriptionView.model = collection.models[ 0 ];
						descriptionView.render();

					}, view.model );
					Backbone.history.navigate( Backbone.history.fragment + '/modal' );
				}

				App.modalRegion.show( descriptionView );

			}
		};

		return Main;
	};

} );
