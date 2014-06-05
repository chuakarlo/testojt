define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var App           = require( 'App' );
	var Utils         = require( 'contentNavigation/controllers/PD360ControllerUtils' );
	var FiltersLayout = require( 'contentNavigation/views/ContentNavigationFiltersLayout' );
	require( 'jquery.bum-smack' );

	App.module( 'ContentNavigation.Controller', function ( Controller ) {

		Controller.PD360 = Marionette.Controller.extend( {

			'initialize' : function ( options ) {

				this.layout = options.layout;
				_.defaults( this, Utils );

				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Filters'
				} );

				var sortBy = new App.ContentNavigation.Entities.SortByCollection();
				sortBy.add( { 'title' : 'Release Date', 'value' : 'created desc' } );
				sortBy.add( { 'title' : 'A-Z', 'value' : 'title asc' } );

				var sortByView = new App.ContentNavigation.Views.SortBy( { 'collection' : sortBy } );

				this.showLoading();
				this.layout.filtersRegion.show( loading );
				this.layout.sortByRegion.show( sortByView );

				this.setEventHandlers();

				var filtersRequest = App.request( 'contentNavigation:filters' );
				var queueRequest   = App.request( 'common:getQueueContents' );

				this.queryModel            = new App.ContentNavigation.Entities.pd360QueryModel();
				this.pd360VideosCollection = new App.ContentNavigation.Entities.PD360VideosCollection();
				this.pd360VideosCollection.queryModel = this.queryModel;

				App.when( filtersRequest, queueRequest ).then( function ( filters, queue ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.showVideos( filters, queue );
				}.bind( this ), this.showError );

			},

			'showVideos' : function ( filters, queueContents ) {

				// show Loading while data is being processed
				this.showLoading();

				// Display filters
				var filtersLayout = new FiltersLayout();
				this.layout.filtersRegion.show( filtersLayout );

				// get Grades from filters
				var grades   = new App.ContentNavigation.Entities.FiltersCollection();
				var subjects = new App.ContentNavigation.Entities.FiltersCollection();
				var topics   = new App.ContentNavigation.Entities.FiltersCollection();

				grades.add( this.mapFilter( filters.models[ 0 ].attributes.Grades ) );
				subjects.add( this.mapFilter( filters.models[ 0 ].attributes.Subjects ) );
				topics.add( this.mapFilter( filters.models[ 0 ].attributes.Topics ) );

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

				this.segmentsView = new App.ContentNavigation.Views.Segments( {
					'collection' : this.pd360VideosCollection
				} );

				var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );
				App.when( videosRequest ).then( function ( videos ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
					this.displayResults( videos, queueContents );

				}.bind( this ), this.showError );
			},

			'showError' : function ( error ) {

				App.content.show( new App.Common.ErrorView( {
					'message' : error,
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

			},

			'updateQueryData' : function ( filter, sort, clearCollection ) {
				var reset = true;

				if ( filter ) {
					this.pd360VideosCollection.updateSearchData( filter );
				}

				if ( sort ) {
					this.queryModel.set( 'sort', sort );
				}

				if ( clearCollection ) {
					this.pd360VideosCollection.updateSearchData( null, clearCollection );
				}

				// reset start and collection
				this.queryModel.set( 'start', 0 );

				this.layout.segmentsRegion.close();
				this.showLoading();

				var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );
				var queueRequest  = App.request( 'common:getQueueContents' );

				App.when( videosRequest, queueRequest ).then( function ( videos, queueContents ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
					this.displayResults( videos, queueContents, reset );

				}.bind( this ), this.showError );

			}

		} );

	} );

} );
