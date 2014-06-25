define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var Vent       = require( 'Vent' );
	var $          = require( 'jquery' );
	require( 'jquery.bum-smack' );

	App.module( 'ContentNavigation.Controller', function ( Controller ) {

		Controller.CustomContent = Marionette.Controller.extend( {

			'initialize' : function ( options ) {

				App.request( 'pd360:hide' );
				this.layout             = options.layout;
				this.customContentModel = options.model;
				this.categories         = new App.ContentNavigation.Entities.CustomContentCollection();

				Vent.trigger( 'contentNavigation:setPendingRequest', true );

				// reset filters and contents region
				this.layout.sortByRegion.close();
				this.layout.filtersRegion.close();
				this.layout.segmentsRegion.close();

				this.showLoading();
				this.showFilterLoading();
				this.setEventHandlers();

				var categoriesRequest = App.request( 'contentNavigation:customContent:categories' , options.model );

				Vent.trigger( 'contentNavigation:updateScrollbar' );

				App.when( categoriesRequest ).then( function ( categories ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.showVideos( categories );
				}.bind( this ), this.showError );

			},

			'setEventHandlers' : function () {

				this.listenTo( Vent, 'contentNavigation:uuv:changeCategory', function ( ContentName ) {
					this.changeCategory( ContentName );
				}.bind( this ) );
			},

			'showVideos' : function ( libraries, queueContents ) {

				this.showLoading();
				this.queueContents = queueContents;

				var library = libraries.toJSON();
				var lib     = _.flatten( library, true );

				_.each( lib, function ( models ) {

					// lib is an array of arrays
					_.each( models, function ( model ) {

						model.isLibrary = true;
						this.categories.add( model );
						if ( model.Children.length ) {
							_.each( model.Children, function ( category ) {
								category.isCategory = true;
								category.parentId = model.ContentId;
								this.categories.add( category );
							}.bind( this ) );
						}
					}.bind( this ) );
				}.bind( this ) );

				this.closeLoading();

				if ( this.categories.length ) {

					var categoriesView = new App.ContentNavigation.Views.CustomCategories( {
						'collection' : this.categories
					} );

					var firstCategory = this.categories.at( 1 ).get( 'ContentName' );

					this.layout.filtersRegion.show( categoriesView );
					this.changeCategory( firstCategory );

				} else {

					var segmentsView = new App.ContentNavigation.Views.Segments( {
						'collection' : new App.ContentNavigation.Entities.CustomContentCollection()
					} );

					this.layout.filtersRegion.close();
					this.layout.segmentsRegion.show( segmentsView );

					// set hasPendingRequest to false
					Vent.trigger( 'contentNavigation:setPendingRequest', false );
				}
			},

			'changeCategory' : function ( contentName ) {

				var queueRequest = App.request( 'common:getQueueContents' );
				var category     = this.categories.findWhere( { 'ContentName' : contentName } );
				var segments     = category.get( 'Children' );

				Vent.trigger( 'contentNavigation:setPendingRequest', true );

				if ( !this.videos ) {
					this.videos = new App.ContentNavigation.Entities.CustomContentCollection();
				} else {
					this.videos.reset();
					this.layout.segmentsRegion.close();
				}

				this.videos.add( segments );
				this.showLoading();

				App.when( queueRequest ).then( function ( queue ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					var contentIds = queue.pluck( 'ContentId' );

					this.videos.each( function ( model ) {
						var _id = model.get( 'ContentId' );
						model.set( 'queued', _.contains( contentIds, _id ) );
					}.bind( this ) );

					this.closeLoading();
					var segmentsView = new App.ContentNavigation.Views.Segments( { 'collection' : this.videos } );
					this.layout.segmentsRegion.show( segmentsView );

					// set hasPendingRequest to false
					Vent.trigger( 'contentNavigation:setPendingRequest', false );

					if ( this.videos.length ) {
						this.noMoreVideos();
					}

				}.bind( this ), this.showError );
			},

			'onClose' : function () {

				$( window ).off( 'scroll.smack' );
				this.stopListening();
				this.categories.reset();
				this.categories = null;
				this.layout = null;
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

			'showLoading' : function () {

				App.flashMessage.close();
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Videos'
				} );
				this.layout.loadingRegion.show( loading );
			},

			'showFilterLoading' : function () {

				App.flashMessage.close();
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Categories'
				} );
				this.layout.filtersRegion.show( loading );
			},

			'closeLoading' : function () {

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

			}

		} );

	} );

} );
