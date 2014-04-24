define( function ( require ) {

	'use strict';

	var Marionette   = require( 'marionette' );
	var async        = require( 'async' );
	var Communicator = require( './Communicator' );
	var config       = require( './config/config' );

	var views = {
		'MainLayoutView' : require('./views/MainLayoutView')
	};

	var subControllers	= {
		'HeaderController'           : require( './controllers/HeaderController' ),
		'ContentLibraryController'   : require( './controllers/ContentLibraryController' )
	};


	var MainController = Marionette.Controller.extend({

		'initialize' : function ( options ) {
			// init option is for instantions that build or does not build
			// the main view and its dependencies
			if ( options.init !== false ) {
				this.App  = { };
				this.vent = new Communicator();

				if ( options.config ) {
					this.config = options.config;
				} else {
					this.config = config;
				}

				this.MainView       = this.createMainView();
				this.MainView.views = { };

				this.App.topRegion    = this.getTopRegion();
				this.App.leftRegion   = this.getLeftRegion();
				this.App.centerRegion = this.getCenterRegion();

				async.series( [
					function ( callback ) {
						this.createControllers.call( this, callback );
					}.bind( this )
				], function () {
					this.createMainViewItems.call( this );
				} .bind( this ) );

			}

		},

		'createMainView' : function ( ) {
			return new views.MainLayoutView();
		},

		'createControllers' : function ( callback ) {
			async.series( [
				function ( callback ) {
					this.App.HeaderController = new subControllers.HeaderController( {
						'App'  : this.App,
						'vent' : this.vent
					} );

					callback( null );
				}.bind( this ),

				function ( callback ) {
					this.App.ContentLibraryController = new subControllers.ContentLibraryController ( {
						'App'  : this.App,
						'vent' : this.vent
					} );

					callback( null );
				}.bind( this )

			], function ( ) {
				callback( null );
			} );
		},

		'createMainViewItems' : function () {

			this.createMainViewHeader();
		},

		'createMainViewHeader' : function () {

			this.getTopRegion().show( this.App.HeaderController.getView() );
		},

		'getTopRegion' : function () {

			return this.MainView.topRegion;
		},

		'getLeftRegion' : function () {

			return this.MainView.leftRegion;
		},

		'getCenterRegion'	: function () {

			return this.MainView.centerRegion;
		}


	} );

	return MainController;

} );