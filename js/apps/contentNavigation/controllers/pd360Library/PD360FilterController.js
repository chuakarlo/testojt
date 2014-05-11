// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	require( 'jquery.pscrollbar' );

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );

	var ControllerBase = {
		'Filter' : require( '../base/FilterBase' )
	};

	var components  = {
		'FilterComponent' : require( '../../components/FilterComponent' )
	};

	var collections = {
		'FilterCollection' : require('../../collections/FilterCollection')
	};

	return Marionette.Controller.extend( {

		'initialize' : function ( options ) {
			_.extend( this , ControllerBase.Filter );

			this.initializeComponent();

			this._createVents( options );

			this.contentLibraryType = options.contentLibraryType;
		},

		'getCustomContentCategories' : function ( ) {
			var fetchCategory =  {
				'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
				'method' : 'RespondGetContentFilters',
				'args'   : {
					'persId' : $.cookie( 'PID' ) || null
				}
			};

			this.fetchingCategories = Remoting.fetch( [ fetchCategory ] );

			App.when( this.fetchingCategories ).done( function ( models ) {
				this.createFilterComponents( models );
			}.bind( this ) ).fail( function ( error ) {

				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred. Please try again later.'
				} );

			}.bind( this ) );
		},

		'mapFilter' : function ( data ) {

			var pd360Filters = [ ];

			_.each( data, function ( filter ) {
				var filterList = {
					'id'    : filter,
					'title' : filter
				};
				pd360Filters.push( filterList );
			} );

			return pd360Filters;
		},

		'createFilterComponents' : function ( data ) {
			// Grades Filter
			var gradesFilterCollection = new collections.FilterCollection();
			gradesFilterCollection.add( this.mapFilter( data[ 0 ].FILTERS.Grades ) );
			var gradesFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Grades',
				'id'                : 'cn-grades-filter',
				'splitColumn'       : true,
				'multiSelect'       : true,
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : gradesFilterCollection
			} );

			this.addFilterComponent( 'gradesFilter', gradesFilterComponent );

			// Subjects Filter
			var subjectsFilterCollection = new collections.FilterCollection();

			subjectsFilterCollection.add( this.mapFilter( data[ 0 ].FILTERS.Subjects ) );

			var subjectsFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Subjects',
				'multiSelect'       : true,
				'id'                : 'cn-subjects-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : subjectsFilterCollection
			} );

			this.addFilterComponent( 'subjectsFilter', subjectsFilterComponent );

			// Topics Filter
			var topicsFilterCollection = new collections.FilterCollection();

			topicsFilterCollection.add( this.mapFilter( data[ 0 ].FILTERS.Topics ) );

			var topicsFilterComponent = new components.FilterComponent({
				'vent'              : this.vent,
				'title'             : 'Topics',
				'multiSelect'       : true,
				'id'                : 'cn-topics-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : topicsFilterCollection
			} );

			this.addFilterComponent( 'topicsFilter', topicsFilterComponent);
		}

	} );

} );
