define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var HomeView   = require( 'apps/homepage/views/BaseItemView' );
	var Session    = require( 'Session' );
	var bootstro   = require( 'bootstro' );

	var districtUtils = require( 'apps/homepage/utils/districtUtil' );
	var homepageUtils = require( 'apps/homepage/utils/homepageUtil' );

	var ServerRequests = require( 'homepage/constants/ServerRequests' );

	App.module( 'Homepage.Show', function ( Show ) {

		var wizardUsed = false;

		var Controller = Marionette.Controller.extend( {

			'initialize' : function () {

				var bootstroCount = 0;

				this.listenTo( App.vent, 'bootstro:itemLoaded', function () {
					bootstroCount += 1;

					if ( bootstroCount === 5 ) {
						this.checkWizard();
					}

				} );

				this.layout = new HomeView();

				this.layout.on( 'before:close', function () {
					if ( wizardUsed ) {
						bootstro.stop();
					}
				} );

			},

			'showHomepage' : function () {
				App.content.show( this.layout );

				homepageUtils.loadHomepage( this.layout );
				districtUtils.processDistrictMessage( this.layout );

				this.registerServerCallbacks();
				this.fetchCarouselData();
			},

			'fetchCarouselData' : function () {
				App.when(
					App.request( 'common:getQueueContents' ),
					App.request( 'homepage:recommendedVideos' )
				).done(
					function ( queuedVideos, recommendedVideos ) {

						function setQueue ( queue, model ) {
							model.set( 'queued', queue.isQueued( model ) );
						}

						queuedVideos.each( setQueue.bind( this, queuedVideos ) );
						recommendedVideos.each( setQueue.bind( this, queuedVideos ) );

						App.vent.trigger( ServerRequests.QueuedVideos, queuedVideos );
						App.vent.trigger( ServerRequests.RecommendedVideos, recommendedVideos );

					}
				).fail(
					App.errorHandler
				);
			},

			'registerServerCallbacks' : function () {
				var self = this;

				var user     = App.request( 'homepage:userProfile' );
				var possName = _.last( user.FirstName ) === 's' ? ( user.FirstName + '\'' ) : ( user.FirstName + '\'s' );

				App.vent.on( ServerRequests.QueuedVideos, function ( collection ) {
					var headerModel = new Backbone.Model( {
						'header' : possName + ' Queue',
						'count'  : collection.length
					} );

					self.layout.yourQueueHeader.show( new App.Homepage.Views.CarouselHeader( {
						'model'      : headerModel,
						'collection' : collection
					} ) );

					self.layout.yourQueueRegion.show( new App.Homepage.Views.QueueCarouselView( {
						'collection' : collection
					} ) );
				} );

				App.vent.on( ServerRequests.RecommendedVideos, function ( collection ) {
					var headerModel = new Backbone.Model( {
						'header' : 'Recommended',
						'count'  : collection.data.numFound
					} );

					self.layout.recommendedVideosHeader.show( new App.Homepage.Views.CarouselHeader( {
						'model'      : headerModel,
						'collection' : collection
					} ) );

					self.layout.recommendedVideosRegion.show( new App.Common.VideoCarouselView( {
						'collection' : collection
					} ) );
				} );
			},

			'checkWizard' : function () {

				var personnel = new App.Entities.Personnel( App.request( 'session:personnel' ) );

				if ( Session.useWizards() && window.innerWidth >= 768 ) {
					wizardUsed = true;

					// Determine if we need to pass in the initials from the EULA acceptance or from the current session
					var LicenseInitials = $.cookie( App.request( 'session:cookies', 'eulaInitials' ) );

					if ( !LicenseInitials ) {
						LicenseInitials = App.request( 'session:personnel', 'LicenseInitials' );
					}

					bootstro.start( null, {

						'margin' : '50px',

						'onStep' : function () {
							$( 'html, body' ).animate( {
								'scrollTop' : $( '.bootstro-highlight' ).offset().top * 0.8
							}, 100 );
						},

						'onExit' : function () {
							personnel.save( {
								'UseWizards'      : 0,
								'LicenseInitials' : LicenseInitials
							}, {
								'success' : function () {
									$.cookie( 'USEWIZARDS', 0 );
								}
							} );
						}
					} );
				}
			}

		} );

		Show.Controller = new Controller();

	} );
} );
