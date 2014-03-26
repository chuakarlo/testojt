// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $           = require( 'jquery' );
	var _			= require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var config      = require( '../config/config' );

	require( 'jquery.pscrollbar' );

	var views = {
		'ErrorView'           : require( '../views/ErrorView' ),
		'FilterContainerView' : require( '../views/Filters/FilterContainerView' )
	};

	var components  = {
		'FilterComponent' : require( '../components/FilterComponent' )
	};

	var collections = {
		'FilterCollection' : require('../collections/FilterCollection')
	};

	return Marionette.Controller.extend( {
		'components'      : {},
		'selectedFilters' : [],

		'initialize' : function ( options ) {
			var self = this;

			this._createVents();

			this.App  = options.App;
			this.view = new views.FilterContainerView();

			this.view.once( 'render', function () {
				self.createFilterComponents();
			} );

			this.vent = options.vent;
		},

		'getView' : function () {
			return this.view;
		},

		'addFilterComponent' : function ( name, component ) {
			component.getView().render();
			this.view.$el.append( component.view.$el );
			this.components[ name ] = component;
		},

		'createFilterComponents' : function () {

			// Grades Filter
			var gradesFilterCollection = new collections.FilterCollection();
			gradesFilterCollection.add( config.Filters.Grades );

			var gradesFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Grades',
				'id'                : 'cn-grades-filter',
				'splitColumn'       : true,
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : gradesFilterCollection
			} );
			this.addFilterComponent( 'gradesFilter', gradesFilterComponent );

			// Subjects Filter
			var subjectsFilterCollection = new collections.FilterCollection();
			subjectsFilterCollection.add( config.Filters.Subjects );

			var subjectsFilterComponent = new components.FilterComponent( {
				'vent'              : this.vent,
				'title'             : 'Subjects',
				'id'                : 'cn-subjects-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : subjectsFilterCollection
			 } );
			this.addFilterComponent( 'subjectsFilter', subjectsFilterComponent );

			// Topics Filter
			var topicsFilterCollection = new collections.FilterCollection();
			topicsFilterCollection.add( config.Filters.Topics );

			var topicsFilterComponent = new components.FilterComponent({
				'vent'              : this.vent,
				'title'             : 'Topics',
				'id'                : 'cn-topics-filter',
				'itemViewContainer' : '.cn-content-filter',
				'collection'        : topicsFilterCollection
			} );

			this.addFilterComponent( 'topicsFilter', topicsFilterComponent);
		},

		'_createVents' : function () {
			this.vent = this.options.vent;

			// Request Response
			this.vent.mediator.on( 'filter:change', this._filterChanged, this );
			this.vent.mediator.on( 'scroll:unset', this._unsetFilterScroll, this );
		},

		'_newFilter' : function () {},

		'_buildFilters'	: function () {
			var _selectedFilters = [];

			_.each( this.components, function ( cmp ) {
				_selectedFilters.push( cmp.getSelectedFilters() );
			} );

			this.selectedFilters = _.flatten( _selectedFilters );
		},

		'_filterChanged' : function () {
			this._buildFilters();
			this.vent.mediator.trigger( 'segment:filter', this.selectedFilters );
		},

		'_unsetFilterScroll' : function ( origHeight ) {
			if ( origHeight < $( '#cn-left-region' ).height() ){
				$( '#cn-left-region' ).perfectScrollbar( 'destroy' );
			}
			else {
				$( '#cn-left-region' ).perfectScrollbar( 'update' );
			}
		}

	} );

} );