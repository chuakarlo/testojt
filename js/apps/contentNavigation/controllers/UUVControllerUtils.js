define( function ( require ) {
	'use strict';

	var _    = require( 'underscore' );
	var App  = require( 'App' );
	var Vent = require( 'Vent' );
	var $    = require( 'jquery' );
	require( 'jquery.bum-smack' );

	return {

		'onClose' : function () {
			$( window ).off( 'scroll.smack' );

			this.segmentsView.close();

			this.UUVideosCollection.reset();
			var args = this.UUVideosCollection.queryModel.get( 'args' );
			if ( _.has( args, 'startRow' ) ) {
				args.startRow = 0;
				this.UUVideosCollection.queryModel.set( 'args', args );
			}

			if ( _.has( args, 'start' ) ) {
				args.start = 0;
				this.UUVideosCollection.queryModel.set( 'args', args );
			}

			this.UUVideosCollection.queryModel = null;
			this.UUVideosCollection            = null;
			this.queryModel.args               = null;
			this.queryModel                    = null;
			this.layout                        = null;

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
						var queueRequest  = App.request( 'common:getQueueContents' );

						App.when( videosRequest, queueRequest ).then( function ( videos, queueContents ) {

							if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
								return;
							}

							this.displayVideos( videos, queueContents );

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

		'noMoreVideos' : function () {
			$( window ).off( 'scroll.smack' );
			var noMoreVideosView = new App.ContentNavigation.Views.NoMoreVideos();
			this.layout.loadingRegion.show( noMoreVideosView );
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
			this.UUVideosCollection.reset();
			this.UUVideosCollection.queryModel.set( 'start', 0 );

			if ( title === 'Popular' || title === 'My Uploads' || title === 'Recommended For You' || title === 'Featured' ) {
				this.UUVideosCollection.resetStart();
				this.UUVideosCollection.setArgs( title );
			} else {
				this.UUVideosCollection.resetStart();
				this.UUVideosCollection.updateSearchData( category.get( 'UUVideoTopicId' ) );
				this.UUVideosCollection.setArgs( 'Other Categories' );
			}

			this.layout.segmentsRegion.close();
			this.showLoading();

			var videosRequest = App.request( 'contentNavigation:uuv:getSegments', this.queryModel );
			var queueRequest  = App.request( 'common:getQueueContents' );

			App.when( videosRequest, queueRequest ).then( function ( videos, queueContents ) {

				if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
					return;
				}

				this.displayVideos( videos, queueContents );

			}.bind( this ), this.showError );

		}

	};

} );
