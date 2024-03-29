define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Vent       = require( 'Vent' );
	var $          = require( 'jquery' );
	require( 'jquery.bum-smack' );

	return {

		'onClose' : function () {
			this.stopListening();
			$( window ).off( 'scroll.smack' );
			this.pd360VideosCollection.reset();

			this.pd360VideosCollection.queryModel.get( 'searchArray' ).length = 0;

			this.pd360VideosCollection.queryModel       = null;
			this.pd360VideosCollection                  = null;
			this.queryModel.get( 'searchArray' ).length = 0;
			this.queryModel                             = null;
			this.layout                                 = null;
		},

		'setEventHandlers' : function () {

			// set event handlers
			this.listenTo( Vent, 'contentNavigation:updateSearchData', function ( filter, category, sort ) {
				this.updateQueryData( filter, category, sort );
			}.bind( this ) );

			this.listenTo( Vent, 'contentNavigation:changeSort', function ( sort ) {
				if ( sort !== this.queryModel.get( 'sort' ) ) {
					this.updateQueryData( null, null, sort );
				}
			}.bind( this ) );

			this.listenTo( Vent, 'contentNavigation:pd360:clearFilters', function ( clearCollection ) {
				this.updateQueryData( null, null, null, clearCollection );
			}.bind( this ) );

			App.reqres.setHandler( 'contentNavigation:getSort', function () {
				return this.queryModel.get( 'sort' );
			}.bind( this ) );
		},

		'mapFilter' : function ( data, category ) {

			var filters = [ ];

			_.each( data, function ( filter ) {
				var filterList = {
					'title'    : filter,
					'category' : category
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

			$( window ).smack( {
				'threshold' : '200px'
			} )
				.done( function () {

					// Show Loading
					this.showLoading();

					var videosRequest = App.request( 'contentNavigation:pd360Videos', this.queryModel );
					Vent.trigger( 'contentNavigation:setPendingRequest', true );

					App.when( videosRequest ).then( function ( videos ) {

						if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
							return;
						}

						this.displayResults( videos );

					}.bind( that ), this.showError );

				}.bind( that ) );
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
			this.layout.loadingRegion.close();
		},

		'noMoreVideos' : function () {
			$( window ).off( 'scroll.smack' );
			var noMoreVideosView = new App.ContentNavigation.Views.NoMoreVideos();
			this.layout.loadingRegion.show( noMoreVideosView );
		},

		'displayResults' : function ( videos, reset ) {

			var queueContents = App.ContentNavigation.Helper.Queue;
			var vids          = videos.slice( 1 );

			this.qContentsIds = queueContents.pluck( 'ContentId' );

			this.segmentsView = new App.ContentNavigation.Views.Segments( {
				'collection' : this.pd360VideosCollection
			} );

			if ( reset ) {
				this.pd360VideosCollection.reset();
			}
			this.pd360VideosCollection.add( vids );
			this.pd360VideosCollection.each( function ( model ) {

				var _id = model.get( 'ContentId' );
				model.set( 'queued', _.contains( this.qContentsIds, _id ) );

			}.bind( this ) );

			this.closeLoading();

			if ( !this.isLoaded ) {
				this.layout.segmentsRegion.show( this.segmentsView );
				this.isLoaded = true;
			}

			// set hasPendingRequest to false
			Vent.trigger( 'contentNavigation:setPendingRequest', false );

			// setup infinite scroll if videos.length === this.queryModel rows && this.pd360VideosCollection !== numFound
			if ( this.pd360VideosCollection.length < this.pd360VideosCollection.queryModel.get( 'numFound' ) ) {
				this.setupInfiniteScroll();
			} else {
				if ( this.pd360VideosCollection.queryModel.get( 'numFound' ) !== undefined  ) {
					this.noMoreVideos();
				}
			}
		}
	};

} );
