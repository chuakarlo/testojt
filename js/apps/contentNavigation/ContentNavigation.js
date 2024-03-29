define( function ( require ) {
	'use strict';

	return function () {

		var Marionette = require( 'marionette' );
		var Backbone   = require( 'backbone' );
		var AuthRouter = require( 'AuthRouter' );
		var App        = require( 'App' );
		var $          = require( 'jquery' );
		var Vent       = require( 'Vent' );
		var _          = require( 'underscore' );

		App.module( 'ContentNavigation', function ( ContentNavigation ) {

			require( 'common/entities/Queue' );
			require( 'contentNavigation/views/Views' );
			require( 'contentNavigation/entities/Entities' );
			require( 'contentNavigation/controllers/UUVController' );
			require( 'contentNavigation/controllers/PD360Controller' );
			require( 'contentNavigation/controllers/CustomContentController' );
			require( 'contentNavigation/helpers/watchLaterQueue' );

			ContentNavigation.Router = AuthRouter.extend( {
				'appRoutes' : {
					'resources/videos' : 'showContentNavigation'
				}
			} );

			var ContentNavigationController = Marionette.Controller.extend( {

				'hasPendingRequest' : false,

				'setPendingRequest' : function ( status ) {
					this.hasPendingRequest = status;
				},

				'setupQueue' : function ( callback ) {
					var queueRequest   = App.request( 'common:getQueueContents' );

					App.when( queueRequest ).then( function ( queue ) {

						if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
							return;
						}

						App.ContentNavigation.Helper.Queue = queue;

						if ( callback instanceof Function ) {
							callback();
						}

					}.bind( this ), function () {

						this.showError( 'Error setting up Watch Later list.' );
					}.bind( this ) );

				},

				'showContentNavigation' : function () {

					App.request( 'pd360:hide' );
					_.extend( this, Backbone.Events );

					// show a loading view while data is fetching
					App.content.show( new App.Common.LoadingView() );

					var librariesRequest = App.request( 'contentNavigation:libraries' );
					App.when( librariesRequest ).then( function ( libraries ) {

						if ( !App.request( 'contentNavigation:isCorrectRoute' ) ) {
							return;
						}

						if ( !this.layout ) {
							var librariesView = new App.ContentNavigation.Views.Libraries( { 'collection' : libraries } );
							this.layout = new App.ContentNavigation.Views.PageLayout();

							App.content.show( this.layout );
							this.layout.librariesRegion.show( librariesView );

							$( 'html' ).addClass( 'cn' );

							this.listenTo( this.layout, 'close', this.destroyControllers );
						}

						// load default library
						Vent.trigger( 'contentNavigation:switchLibrary', null, true );

					}.bind( this ), this.showError );
				},

				'switchLibrary' : function ( model, defaultLibrary ) {

					// reset Library
					if ( this.activeLibrary ) {
						this.activeLibrary.close();
						this.activeLibrary = null;
						delete this.activeLibrary;
					}

					if ( defaultLibrary ) {
						this.activeLibrary = new App.ContentNavigation.Controller.PD360( { 'layout' : this.layout } );
					} else if ( model && model.get( 'LibraryType' ) === 'uuv' ) {
						this.activeLibrary = new App.ContentNavigation.Controller.UUV( { 'layout' : this.layout } );
					} else {
						this.activeLibrary = new App.ContentNavigation.Controller.CustomContent( { 'layout' : this.layout, 'model' : model } );
					}

				},

				'showError' : function ( error ) {

					App.content.show( new App.Common.ErrorView( {
						'message' : error,
						'flash'   : 'An error occurred initializing contents. Please try again later.'
					} ) );

				},

				'destroyControllers' : function () {
					$( 'html' ).removeClass( 'cn' );
					$( window ).off( 'scroll.smack' );

					this.activeLibrary.close();
					this.activeLibrary = null;
					delete this.activeLibrary;

					this.layout.close();
					this.layout = null;
				}

			} );

			Vent.on( 'contentNavigation:switchLibrary', function ( model, defaultLibrary ) {

				return API.switchLibrary( model, defaultLibrary );
			} );

			Vent.on( 'contentNavigation:setPendingRequest', function ( status ) {
				return API.setPendingRequest( status );
			} );

			Vent.on( 'contentNavigation:setupQueue', function ( callback ) {
				return API.setupQueue( callback );
			} );

			App.vent.on( 'common:queued', function ( model ) {
				if ( App.ContentNavigation.Helper.Queue ) {
					App.ContentNavigation.Helper.Queue.add( model );
				}
			} );

			App.vent.on( 'common:dequeued', function ( model ) {
				if ( App.ContentNavigation.Helper.Queue ) {
					App.ContentNavigation.Helper.Queue.remove( model );
				}
			} );

			App.reqres.setHandler( 'contentNavigation:isCorrectRoute', function () {
				return Backbone.history.fragment.match( /resources\/videos$/ );
			} );

			App.reqres.setHandler( 'contentNavigation:hasPendingRequest', function () {
				return API.hasPendingRequest;
			} );

			var API = new ContentNavigationController();

			App.addInitializer( function () {
				new ContentNavigation.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
