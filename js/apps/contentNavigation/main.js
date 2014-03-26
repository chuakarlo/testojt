define( function ( require ) {
	'use strict';

	var Marionette   = require( 'marionette' );
	var async        = require( 'async' );
	var Communicator = require('./Communicator');
	var config       = require( './config/config' );

	var views = {
		'MainLayoutView'         : require('./views/MainLayoutView'),
		'SegmentItemView'        : require( './views/Segments/SegmentItemView' ),
		'SegmentsCollectionView' : require( './views/Segments/SegmentCollectionView' )
	};

	var components = {
		'FilterComponent'            : require( './components/FilterComponent' ),
		'SegmentCollectionComponent' : require( './components/SegmentCollectionComponent' )
	};

	var collections = {
	    'SegmentCollection' : require( './collections/SegmentCollection' )
	};

	var subControllers	= {
		'HeaderController'   : require( './controllers/HeaderController' ),
		'FiltersController'  : require( './controllers/FiltersController' ),
		'GridController'     : require( './controllers/GridController' ),
		'SegmentsController' : require( './controllers/SegmentsController' ),
		'Utils'              : require( './controllers/UtilitiesController' )
	};


	var MainController = Marionette.Controller.extend({
		'Views' : {
			'SegmentItem'       : views.SegmentItemView,
			'SegmentCollection' : views.SegmentsCollectionView
		},

		'Components' : {
			'Filter'            : components.FilterComponent,
			'SegmentCollection' : components.SegmentCollectionComponent
		},

		'Collections' : {
			'Segments' : collections.SegmentCollection
		},

		'initialize' : function ( options ) {

			// init option is for instantions that build or does not build
			// the main view and its dependencies
			if ( options.init !== false ) {
				this.App  = {};
				this.vent = new Communicator();

				if ( options.config ) {
					this.config = options.config;
				} else {
					this.config = config;
				}

				this.MainView       = this.createMainView();
				this.MainView.views = {};

				async.series( [
					function ( callback ) {
						this.createControllers.call(this, callback);
					}.bind( this )
				], function () {
					this.createMainViewItems.call(this);
				} .bind( this ) );

			}

		},

		'createMainView' : function () {
			return new views.MainLayoutView();
		},

		createControllers: function (callback) {
			async.series( [
				function ( callback ) {
					this.App.HeaderController = new subControllers.HeaderController( {
						'App'  : this.App,
						'vent' : this.vent
					} );

					callback( null );
				}.bind( this ),

				function ( callback ) {
					this.App.FiltersController = new subControllers.FiltersController( {
						'App'  : this.App,
						'vent' : this.vent
					} );

					callback( null );
				}.bind( this ),

				function ( callback ) {
					this.App.GridController = new subControllers.GridController( {
						'App'  : this.App,
						'vent' : this.vent
					} );

					callback( null );
				}.bind( this ),

				function ( callback ) {
					this.App.SegmentsController = new subControllers.SegmentsController( {
						'App'  : this.App,
						'vent' : this.vent
					} );

					callback( null );
				}.bind( this )

			], function () {
				callback( null );
			} );

		},

		'createMainViewItems' : function () {
			this.createMainViewHeader();
			this.createMainViewFilter();
			this.createMainViewGrid();
			this.createMainViewGridContent();
		},

		'createMainViewHeader' : function () {
			this.MainView.topRegion.show( this.App.HeaderController.getView() );

			return this.App.HeaderController;
		},

		'createMainViewFilter' : function () {
			var filterView = this.App.FiltersController.getView();

			this.MainView.leftRegion.show( filterView );

			return filterView;
		},

		'createMainViewGrid' : function () {
			var gridView = this.App.GridController.getView();

			this.MainView.centerRegion.show(gridView);
			this.MainView.views.GridContent = gridView;

			return gridView;
		},

		'createMainViewGridContent' : function () {
			var segmentsView = this.App.SegmentsController.getView();

			this.MainView.views.GridContent.mainRegion.show( segmentsView );

			return segmentsView;
		}

	} );

	return MainController;

} );