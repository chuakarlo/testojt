define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var Vent       = require( 'Vent' );
	var Utils      = require( 'contentNavigation/controllers/UUVControllerUtils' );
	require( 'jquery.bum-smack' );

	App.module( 'ContentNavigation.Controller', function ( Controller ) {

		Controller.UUV = Marionette.Controller.extend( {

			'initialize' : function ( options ) {

				this.layout = options.layout;
				_.defaults( this, Utils );

				// reset filters and contents region
				this.layout.sortByRegion.close();
				this.layout.filtersRegion.close();
				this.layout.segmentsRegion.close();

				var categories = new App.ContentNavigation.Entities.UUVCategoriesCollection();
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

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.showVideos( queue );
				}.bind( this ), this.showError );

			},

			'displayVideos' : function ( vids, queueContents ) {

				var videos = vids;

				this.qContentsIds = queueContents.pluck( 'UUVideoId' );

				if ( vids.length && vids.at( 0 ).has( 'numFound' ) ) {
					this.queryModel.set( 'numFound', vids.at( 0 ).get( 'numFound' ) );
					videos = vids.slice( 1 );
				}

				videos.forEach( function ( model ) {

					var _id = model.get( 'UUVideoId' );
					model.set( 'queued', _.contains( this.qContentsIds, _id ) );

					this.UUVideosCollection.add( model );
				}.bind( this ) );

				this.closeLoading();
				this.layout.segmentsRegion.show( this.segmentsView );

				// setup infinite scroll if last result is equal to 24
				this.queryModel.set( 'lastResultsLength', videos.length );

				if ( this.queryModel.get( 'lastResultsLength' ) === this.queryModel.get( 'rows' ) ) {

					this.UUVideosCollection.updateStart();
					this.setupInfiniteScroll();
				} else {
					if ( this.UUVideosCollection.queryModel.get( 'lastResultsLength' ) !== 0 ) {
						this.noMoreVideos();
					}

				}
			},

			'showVideos' : function ( queueContents ) {

				Vent.trigger( 'contentNavigation:updateScrollbar' );

				// remove handlers for filters
				this.showLoading();

				this.segmentsView = new App.ContentNavigation.Views.Segments( {
					'collection' : this.UUVideosCollection
				} );

				this.UUVideosCollection.reset();
				this.UUVideosCollection.setArgs( 'Popular' );
				var videosRequest = App.request( 'contentNavigation:uuv:getSegments', this.queryModel );

				App.when( videosRequest ).then( function ( videos ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.displayVideos( videos, queueContents );

				}.bind( this ), this.showError );
			}

		} );

	} );

} );
