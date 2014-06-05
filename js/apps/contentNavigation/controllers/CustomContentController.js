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

				this.layout             = options.layout;
				this.customContentModel = options.model;

				// reset filters and contents region
				this.layout.sortByRegion.close();
				this.layout.filtersRegion.close();
				this.layout.segmentsRegion.close();

				this.showLoading();
				this.showFilterLoading();
				this.setEventHandlers();
				this.categories = new App.ContentNavigation.Entities.CustomContentCollection();

				var categoriesRequest = App.request( 'contentNavigation:customContent:categories' , options.model );

				App.when( categoriesRequest ).then( function ( categories ) {

					if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
						return;
					}

					this.showVideos( categories );
				}.bind( this ), this.showError );

			},

			'setEventHandlers' : function () {
				// set event handlers
				this.listenTo( Vent, 'contentNavigation:uuv:changeCategory', function ( ContentName ) {
					this.changeCategory( ContentName );
				}.bind( this ) );
			},

			'showVideos' : function ( libraries, queueContents ) {

				Vent.trigger( 'contentNavigation:updateScrollbar' );

				this.showLoading();
				this.queueContents = queueContents;

				var library = libraries.toJSON();
				var lib = _.flatten( library, true );
				//categories.add( library );

				_.each( lib, function ( models ) {

					// lib is an array of arrays
					_.each( models, function ( model ) {
						model.isLibrary = true;
						this.categories.add( model );
						if ( model.Children.length ) {
							_.each( model.Children, function ( category ) {
								category.isCategory = true;
								this.categories.add( category );
							}.bind( this ) );
						}
					}.bind( this ) );
				}.bind( this ) );

				this.closeLoading();

				if ( this.categories.length ) {
					var categoriesView = new App.ContentNavigation.Views.CustomCategories( { 'collection' : this.categories } );
					this.layout.filtersRegion.show( categoriesView );

					// Load default category, at categories.at( 1 );
					var firstCategory = this.categories.at( 1 ).get( 'ContentName' );
					this.changeCategory( firstCategory );
				} else {

					this.layout.filtersRegion.close();
					var segmentsView = new App.ContentNavigation.Views.Segments( { 'collection' : new App.ContentNavigation.Entities.CustomContentCollection() } );
					this.layout.segmentsRegion.show( segmentsView );
				}
			},

			'changeCategory' : function ( contentName ) {

				var queueRequest = App.request( 'common:getQueueContents' );
				// Load default category, at categories.at( 1 );
				if ( !this.videos ) {
					this.videos   = new App.ContentNavigation.Entities.CustomContentCollection();
				} else {
					this.videos.reset();
					this.layout.segmentsRegion.close();
				}
				var category = this.categories.findWhere( { 'ContentName' : contentName } );
				var segments = category.get( 'Children' );
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

			'showFilterLoading' : function () {
				// Hide any error message
				App.flashMessage.close();

				// Show a loading view
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : false,
					'text'       : 'Loading Categories'
				} );

				this.layout.filtersRegion.show( loading );
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

			}

		} );

	} );

} );
