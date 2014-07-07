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

				App.request( 'pd360:hide' );
				this.layout = options.layout;
				_.defaults( this, Utils );
				_.bindAll( this, 'setupCategories', 'showVideos', 'displayVideos' );

				Vent.trigger( 'contentNavigation:setPendingRequest', true );

				// reset filters and contents region
				this.layout.sortByRegion.close();
				this.layout.filtersRegion.close();
				this.layout.segmentsRegion.close();

				this.showLoading();
				this.showCategoriesLoading();
				this.setEventHandlers();

				this.queryModel         = new App.ContentNavigation.Entities.UUVQueryModel();
				this.UUVideosCollection = new App.ContentNavigation.Entities.UUVideosCollection();

				this.UUVideosCollection.queryModel = this.queryModel;

				Vent.trigger( 'contentNavigation:setupQueue', this.setupCategories );
			},

			'setupCategories' : function () {
				var categoriesRequest = App.request( 'contentNavigation:uuv:getCategories' );

				App.when( categoriesRequest ).then( function ( categories ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.showVideos( categories );
				}.bind( this ), function () {
					this.showError();
				} );
			},

			'showVideos' : function ( uuvCategories ) {

				var categoriesView = new App.ContentNavigation.Views.UUVCategories( { 'collection' : uuvCategories  } );

				this.layout.filtersRegion.show( categoriesView );

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

					this.displayVideos( videos );

				}.bind( this ), this.showError );
			},

			'displayVideos' : function ( vids ) {

				var videos        = vids;
				var queueContents = App.ContentNavigation.Helper.Queue;

				this.qContentsIds = queueContents.pluck( 'UUVideoId' );

				if ( vids.length && vids.at( 0 ).has( 'numFound' ) ) {
					this.queryModel.set( 'numFound', vids.at( 0 ).get( 'numFound' ) );
					videos = vids.slice( 1 );
				}

				if ( vids.length && !vids.at( 0 ).has( 'numFound' ) && !vids.at( 0 ).has( 'UUVideoId' ) ) {
					videos = vids.slice( 1 );
				}

				videos.forEach( function ( model ) {

					var _id = model.get( 'UUVideoId' );
					model.set( 'queued', _.contains( this.qContentsIds, _id ) );

					this.UUVideosCollection.add( model );
				}.bind( this ) );

				this.closeLoading();
				this.layout.segmentsRegion.show( this.segmentsView );

				// set hasPendingRequest to false
				Vent.trigger( 'contentNavigation:setPendingRequest', false );

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
			}

		} );

	} );

} );
