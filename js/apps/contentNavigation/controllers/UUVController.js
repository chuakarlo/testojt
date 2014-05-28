define( function ( require ) {
	'use strict';

	var _                    = require( 'underscore' );
	var Marionette           = require( 'marionette' );
	var App                  = require( 'App' );
	var Vent                 = require( 'Vent' );
	var $                    = require( 'jquery' );
	var CategoriesCollection = require( 'contentNavigation/collections/UUVCategoriesCollection' );
	require( 'jquery.bum-smack' );

	App.module( 'ContentNavigation.Controller', function ( Controller ) {

		Controller.UUV = Marionette.Controller.extend( {

			'initialize' : function ( options ) {

				this.layout = options.layout;

				// reset filters and contents region
				this.layout.sortByRegion.close();
				this.layout.filtersRegion.close();
				this.layout.segmentsRegion.close();

				var categories = new CategoriesCollection();
				categories.add( App.ContentNavigation.Entities.UUVCategories );

				var categoriesView = new App.ContentNavigation.Views.UUVCategories( { 'collection' : categories } );

				this.layout.filtersRegion.show( categoriesView );
				this.showLoading();
				this.setEventHandlers();

				var queueRequest = App.request( 'common:getQueueContents' );
				this.queryModel         = new App.ContentNavigation.Entities.UUVQueryModel();
				this.UUVideosCollection = new App.ContentNavigation.Entities.UUVideosCollection();

				this.UUVideosCollection.queryModel = this.queryModel;

				App.when( queueRequest ).then( function ( queue ) {

					this.showVideos( queue );
				}.bind( this ), this.showError );

			},

			'onClose' : function () {
				$( window ).off( 'scroll.smack' );

				this.segmentsView.close();

				this.UUVideosCollection.reset();
				this.UUVideosCollection.queryModel = null;
				this.UUVideosCollection = null;
				this.queryModel = null;
				this.layout = null;

			},

			'setEventHandlers' : function () {
				// set event handlers
				this.listenTo( Vent, 'contentNavigation:uuv:changeCategory', function ( model ) {
					this.updateQueryData( model );
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

				this.UUVideosCollection.updateStart();

				var rows              = this.UUVideosCollection.queryModel.get( 'rows' );
				var lastResultsLength = this.UUVideosCollection.queryModel.get( 'lastResultsLength' );

				// check to see if we should continue setting up the smack
				// based on the number of results and stuff...
				if ( lastResultsLength === rows ) {
					$( window ).smack( {
						'threshold' : '200px'
					} )
						.done( function () {

							// Show Loading
							this.showLoading();

							var videosRequest = App.request( 'contentNavigation:uuv:getSegments', this.queryModel );

							App.when( videosRequest ).then( function ( videos ) {

								videos.each( function ( model ) {

									var _id = model.get( 'UUVideoId' );
									model.set( 'queued', _.contains( this.qContentsIds, _id ) );

									this.UUVideosCollection.add( model );
								}.bind( this ) );

								this.closeLoading();
								this.layout.segmentsRegion.show( this.segmentsView );

								// setup infinite scroll if last result is equal to 24
								this.queryModel.set( 'lastResultsLength', videos.length );

								if ( this.queryModel.get( 'lastResultsLength' ) === this.queryModel.get( 'rows' ) ) {
									this.setupInfiniteScroll();
								}

							}.bind( this ), this.showError );

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

			'showVideos' : function ( queueContents ) {

				// remove handlers for filters
				this.showLoading();

				this.qContentsIds = queueContents.pluck( 'UUVideoId' );
				this.segmentsView = new App.ContentNavigation.Views.Segments( {
					'collection' : this.UUVideosCollection
				} );

				this.UUVideosCollection.reset();
				this.UUVideosCollection.setArgs( 'Popular' );
				var videosRequest = App.request( 'contentNavigation:uuv:getSegments', this.queryModel );

				App.when( videosRequest ).then( function ( videos ) {
					var vids = videos;

					if ( videos.length && videos.at( 0 ).hasOwnProperty( 'numFound' ) ) {
						this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
						vids = videos.slice( 1 );
					}

					videos.each( function ( model ) {

						var _id = model.get( 'UUVideoId' );
						model.set( 'queued', _.contains( this.qContentsIds, _id ) );

						this.UUVideosCollection.add( model );
					}.bind( this ) );

					this.closeLoading();
					this.layout.segmentsRegion.show( this.segmentsView );

					// setup infinite scroll if last result is equal to 24
					this.queryModel.set( 'lastResultsLength', vids.length );

					if ( this.queryModel.get( 'lastResultsLength' ) === this.queryModel.get( 'rows' ) ) {
						this.setupInfiniteScroll();
					}

				}.bind( this ), this.showError );
			},

			'showError' : function ( error ) {

				App.content.show( new App.Common.ErrorView( {
					'message' : error,
					'flash'   : 'An error occurred. Please try again later.'
				} ) );

			},

			'updateQueryData' : function ( category ) {
				var title = category.get( 'title' );

				// reset start and collection
				$( window ).off( 'scroll.smack' );
				this.queryModel.set( 'start', 0 );
				this.UUVideosCollection.reset();

				if ( title === 'Popular' || title === 'My Uploads' || title === 'Recommended For You' || title === 'Featured' ) {
					this.UUVideosCollection.setArgs( title );
				} else {
					this.UUVideosCollection.setArgs( 'Other Categories' );
					this.UUVideosCollection.updateSearchData( category.get( 'UUVideoTopicId' ) );
				}

				this.layout.segmentsRegion.close();
				this.showLoading();

				var videosRequest = App.request( 'contentNavigation:uuv:getSegments', this.queryModel );

				App.when( videosRequest ).then( function ( videos ) {

					var vids = videos;

					if ( videos.length && videos.at( 0 ).hasOwnProperty( 'numFound' ) ) {
						this.queryModel.set( 'numFound', videos.at( 0 ).get( 'numFound' ) );
						vids = videos.slice( 1 );
					}

					videos.each( function ( model ) {

						var _id = model.get( 'UUVideoId' );
						model.set( 'queued', _.contains( this.qContentsIds, _id ) );

						this.UUVideosCollection.add( model );
					}.bind( this ) );

					this.closeLoading();
					this.layout.segmentsRegion.show( this.segmentsView );

					// setup infinite scroll if last result is equal to 24
					this.queryModel.set( 'lastResultsLength', vids.length );

					if ( this.queryModel.get( 'lastResultsLength' ) === this.queryModel.get( 'rows' ) ) {
						this.setupInfiniteScroll();
					}

				}.bind( this ), this.showError );

			}

		} );

	} );

} );
