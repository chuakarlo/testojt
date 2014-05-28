define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var Vent              = require( 'Vent' );
	var $                 = require( 'jquery' );
	var FiltersLayout     = require( 'contentNavigation/views/ContentNavigationFiltersLayout' );
	var FiltersCollection = require( 'contentNavigation/collections/FiltersCollection' );
	var SortByCollection  = require( 'contentNavigation/collections/SortByCollection' );
	require( 'jquery.bum-smack' );

	App.module( 'ContentNavigation.Controller', function ( Controller ) {

		Controller.PD360 = Marionette.Controller.extend( {

			'initialize' : function ( options ) {

				this.layout = options.layout;

				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Videos'
				} );

				var sortBy = new SortByCollection();
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

					this.showVideos( filters, queue );
				}.bind( this ), this.showError );

			},

			'onClose' : function () {
				this.stopListening();
				$( window ).off( 'scroll.smack' );
				this.pd360VideosCollection.reset();
				this.pd360VideosCollection = null;
				this.queryModel = null;
				this.layout = null;
			},

			'setEventHandlers' : function () {

				// set event handlers
				this.listenTo( Vent, 'contentNavigation:updateSearchData', function ( filter ) {
					this.updateQueryData( filter );
				}.bind( this ) );

				this.listenTo( Vent, 'contentNavigation:changeSort', function ( sort ) {
					if ( sort !== this.queryModel.get( 'sort' ) ) {
						this.updateQueryData( null, sort );
					}
				}.bind( this ) );
			},

			'mapFilter' : function ( data ) {

				var filters = [ ];

				_.each( data, function ( filter ) {
					var filterList = {
						'title' : filter
					};
					filters.push( filterList );
				} );

				return filters;
			},

			'setupInfiniteScroll' : function () {
				// When the window scroll bar gets to 200px from the bottom
				// of the window, fetch the next set of results.
				var that = this;

				this.pd360VideosCollection.updateStart();

				var numFound = this.pd360VideosCollection.queryModel.get( 'numFound' );
				var start    = this.pd360VideosCollection.queryModel.get( 'start' );
				var rows     = this.pd360VideosCollection.queryModel.get( 'rows' );

				// check to see if we should continue setting up the smack
				// based on the number of results and stuff...
				if ( numFound > start && numFound > rows || !numFound && !start ) {
					$( window ).smack( {
						'threshold' : '200px'
					} )
						.done( function () {

							// Show Loading
							this.showLoading();

							var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );
							App.when( videosRequest ).then( function ( videos ) {

								this.displayResults( videos );

							}.bind( that ), this.showError );

						}.bind( that ) );
				}

			},

			'showLoading' : function () {
				// Hide any error message
				App.flashMessage.close();

				// Show a loading view
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Videos'
				} );

				this.layout.loadingRegion.show( loading );
			},

			'closeLoading' : function () {
				// Close the loading view
				this.layout.loadingRegion.close();
			},

			'showVideos' : function ( filters, queueContents ) {

				// show Loading while data is being processed
				this.showLoading();

				// Display filters
				var filtersLayout = new FiltersLayout();
				this.layout.filtersRegion.show( filtersLayout );

				// get Grades from filters
				var grades   = new FiltersCollection();
				var subjects = new FiltersCollection();
				var topics   = new FiltersCollection();

				grades.add( this.mapFilter( filters.models[ 0 ].attributes.Grades ) );
				subjects.add( this.mapFilter( filters.models[ 0 ].attributes.Subjects ) );
				topics.add( this.mapFilter( filters.models[ 0 ].attributes.Topics ) );

				var gradesView = new App.ContentNavigation.Views.Filters( {
					'collection'  : grades,
					'id'          : 'cn-grades-filter',
					'splitColumn' : true
				} );
				var subjectsView = new App.ContentNavigation.Views.Filters( {
					'collection'  : subjects,
					'id'          : 'cn-subjects-filter',
					'splitColumn' : false
				} );
				var topicsView = new App.ContentNavigation.Views.Filters( {
					'collection'  : topics,
					'id'          : 'cn-topics-filter',
					'splitColumn' : false
				} );

				// display views for filters
				filtersLayout.gradesRegion.show( gradesView );
				filtersLayout.subjectsRegion.show( subjectsView );
				filtersLayout.topicsRegion.show( topicsView );

				this.qContentsIds = queueContents.pluck( 'ContentId' );
				this.segmentsView = new App.ContentNavigation.Views.Segments( {
					'collection' : this.pd360VideosCollection
				} );

				var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );
				App.when( videosRequest ).then( function ( videos ) {

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

			'displayResults' : function ( videos ) {

				var vids = videos.slice( 1 );

				this.pd360VideosCollection.add( vids );
				this.pd360VideosCollection.each( function ( model ) {

					var _id = model.get( 'ContentId' );
					model.set( 'queued', _.contains( this.qContentsIds, _id ) );

				}.bind( this ) );

				this.closeLoading();
				this.layout.segmentsRegion.show( this.segmentsView );
				this.setupInfiniteScroll();
			},

			'updateQueryData' : function ( filter, sort ) {

				if ( filter ) {
					this.pd360VideosCollection.updateSearchData( filter );
				}

				if ( sort ) {
					this.queryModel.set( 'sort', sort );
				}

				// reset start and collection
				this.queryModel.set( 'start', 0 );
				this.pd360VideosCollection.reset();
				this.showLoading();

				var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );
				App.when( videosRequest ).then( function ( videos ) {

					this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
					this.displayResults( videos );

				}.bind( this ), this.showError );

			}

		} );

	} );

} );
