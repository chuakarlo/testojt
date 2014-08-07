define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var App           = require( 'App' );
	var Vent          = require( 'Vent' );
	var Utils         = require( 'contentNavigation/controllers/PD360ControllerUtils' );
	var FiltersLayout = require( 'contentNavigation/views/ContentNavigationFiltersLayout' );
	require( 'jquery.bum-smack' );

	App.module( 'ContentNavigation.Controller', function ( Controller ) {

		Controller.PD360 = Marionette.Controller.extend( {

			'isLoaded' : false,

			'initialize' : function ( options ) {

				App.request( 'pd360:hide' );
				this.layout = options.layout;
				_.defaults( this, Utils );
				_.bindAll( this );

				Vent.trigger( 'contentNavigation:setPendingRequest', true );

				// reset filters and contents region
				this.layout.sortByRegion.close();
				this.layout.filtersRegion.close();
				this.layout.segmentsRegion.close();

				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Filters'
				} );

				var sortBy = new App.ContentNavigation.Entities.SortByCollection();
				sortBy.add( { 'title' : 'Relevance', 'value' : 'score desc' } );
				sortBy.add( { 'title' : 'Release Date', 'value' : 'created desc' } );
				sortBy.add( { 'title' : 'A-Z', 'value' : 'title asc' } );

				var sortByView = new App.ContentNavigation.Views.SortBy( { 'collection' : sortBy } );

				this.showLoading();
				this.layout.filtersRegion.show( loading );
				this.layout.sortByRegion.show( sortByView );

				this.setEventHandlers();

				this.queryModel            = new App.ContentNavigation.Entities.pd360QueryModel();
				this.pd360VideosCollection = new App.ContentNavigation.Entities.PD360VideosCollection();
				this.pd360VideosCollection.queryModel = this.queryModel;

				Vent.trigger( 'contentNavigation:setupQueue', this.setupFilters );
			},

			'setupFilters' : function () {
				var filtersRequest = App.request( 'contentNavigation:filters' );

				App.when( filtersRequest ).then( function ( filters ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.showFilters( filters );
				}.bind( this ), function () {
					this.showError();
				}.bind( this ) );

			},

			'showFilters' : function ( filters ) {

				// show Loading while data is being processed
				this.showLoading();

				// Display filters
				var filtersLayout = new FiltersLayout();
				this.layout.filtersRegion.show( filtersLayout );

				// get Grades from filters
				var grades   = new App.ContentNavigation.Entities.FiltersCollection();
				var subjects = new App.ContentNavigation.Entities.FiltersCollection();
				var topics   = new App.ContentNavigation.Entities.FiltersCollection();

				grades.add( this.mapFilter( filters.models[ 0 ].attributes.Grades, 'Grades' ) );
				subjects.add( this.mapFilter( filters.models[ 0 ].attributes.Subjects, 'Subjects' ) );
				topics.add( this.mapFilter( filters.models[ 0 ].attributes.Topics, 'Topics' ) );

				var gradesView = new App.ContentNavigation.Views.Filters( {
					'collection'  : grades,
					'id'          : 'cn-grades-filter',
					'filterName'  : 'Grades',
					'splitColumn' : true
				} );
				var subjectsView = new App.ContentNavigation.Views.Filters( {
					'collection'  : subjects,
					'id'          : 'cn-subjects-filter',
					'filterName'  : 'Subjects',
					'splitColumn' : false
				} );
				var topicsView = new App.ContentNavigation.Views.Filters( {
					'collection'  : topics,
					'id'          : 'cn-topics-filter',
					'filterName'  : 'Topics',
					'splitColumn' : false
				} );

				// display views for filters
				filtersLayout.gradesRegion.show( gradesView );
				filtersLayout.subjectsRegion.show( subjectsView );
				filtersLayout.topicsRegion.show( topicsView );

				var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );

				App.when( videosRequest ).then( function ( videos ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
					this.displayResults( videos );

				}.bind( this ), this.showError );
			},

			'showError' : function ( error ) {

				App.content.show( new App.Common.ErrorView( {
					'message' : error,
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

			},

			'updateQueryData' : function ( filter, category, sort, clearCollection ) {
				var reset		= true;
				this.isLoaded	= false;

				Vent.trigger( 'contentNavigation:setPendingRequest', true );

				if ( filter ) {
					this.pd360VideosCollection.updateSearchData( filter, category );
				}

				if ( sort ) {
					this.queryModel.set( 'sort', sort );
				}

				if ( clearCollection ) {
					this.pd360VideosCollection.updateSearchData( null, null, clearCollection );
				}

				// reset start and collection
				this.queryModel.set( 'start', 0 );

				this.layout.segmentsRegion.close();
				this.showLoading();

				var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );

				App.when( videosRequest ).then( function ( videos ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
					this.displayResults( videos, reset );

				}.bind( this ), this.showError );

			}

		} );

	} );

} );
