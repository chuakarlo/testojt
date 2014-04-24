// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var _			= require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var config      = require( '../../config/config' );

	var ControllerBase = {
		'Filter' : require( '../base/FilterBase' )
	};

	require( 'jquery.pscrollbar' );

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
			this.createFilterComponents( );
		},

		'createFilterComponents' : function () {
			// Grades Filter
			var gradesFilterCollection = new collections.FilterCollection();

			gradesFilterCollection.add( config.Filters[ this.contentLibraryType + '-Grades' ] );

			var gradesFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Grades',
				'id'                : 'cn-grades-filter',
				'splitColumn'       : true,
				'multiSelect'		: true,
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : gradesFilterCollection
			} );

			this.addFilterComponent( 'gradesFilter', gradesFilterComponent );

			// Subjects Filter
			var subjectsFilterCollection = new collections.FilterCollection();

			subjectsFilterCollection.add( config.Filters[ this.contentLibraryType + '-Subjects' ] );

			var subjectsFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Subjects',
				'multiSelect'		: true,
				'id'                : 'cn-subjects-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : subjectsFilterCollection
			 } );

			this.addFilterComponent( 'subjectsFilter', subjectsFilterComponent );

			// Topics Filter
			var topicsFilterCollection = new collections.FilterCollection();

			topicsFilterCollection.add( config.Filters[ this.contentLibraryType + '-Topics' ] );

			var topicsFilterComponent = new components.FilterComponent({
				'vent'              : this.vent,
				'title'             : 'Topics',
				'multiSelect'		: true,
				'id'                : 'cn-topics-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : topicsFilterCollection
			} );

			this.addFilterComponent( 'topicsFilter', topicsFilterComponent);
		}

	} );

} );