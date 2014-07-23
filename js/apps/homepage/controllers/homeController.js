define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var HomeView   = require( 'apps/homepage/views/BaseItemView' );
	var Session    = require( 'Session' );
	var bootstro   = require( 'bootstro' );

	var districtUtils = require( 'apps/homepage/utils/districtUtil' );
	var homepageUtils = require( 'apps/homepage/utils/homepageUtil' );

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

			},

			'checkWizard' : function () {

				var personnelRequest = App.request( 'user:personnel' );

				App.when( personnelRequest ).done( function ( personnel ) {

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

				} );

			}
		} );

		Show.Controller = new Controller();

	} );
} );
