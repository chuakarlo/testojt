define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/eula/eulaLayout.html' );
	var App        = require( 'App' );
	var moment     = require( 'moment' );
	var Ladda      = require( 'ladda' );

	require( 'timezone' );
	require( 'validation' );
	require( 'backbone.stickit' );
	require( 'user/SessionHelper' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'eulaRegion' : '#eula-content'
		},

		'ui' : {
			'acceptButton'  : '#btn-accept',
			'declineButton' : '#btn-decline'
		},

		'events' : {
			'submit'                  : 'accept',
			'click @ui.declineButton' : 'decline'
		},

		'bindings' : {
			'[name="LicenseInitials"]' : 'LicenseInitials'
		},

		'onRender' : function () {

			// Clear out License Initials to force them to re-enter them
			this.model.set( 'LicenseInitials', '' );

			// Bind model to form
			this.stickit();

		},

		'initialize' : function ( options ) {

			// Add validation
			this.model.setupEulaValidation();
			Backbone.Validation.bind( this );

		},

		'accept' : function ( event ) {
			event.preventDefault();

			if ( this.model.isValid( true ) ) {
				var l = Ladda.create( document.querySelector( '#btn-accept' ) );
				l.start();

				var now = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss' );

				this.model.set( 'LicenseAccepted', now );

				this.model.save( null, {

					'success' : function () {
						// Add a cookie showing the user has accepted the EULA
						$.cookie( App.request( 'session:cookies', 'eula' ), now );
						l.stop();
						App.navigate( 'home', { 'trigger' : true } );
					},

					'error' : function ( error ) {
						l.stop();
						App.vent.trigger( 'flash:message', {
							'message' : 'An error occurred and your agreement could not be recorded',
							'type'    : 'error'
						} );
					}

				} );

			}

		},

		'decline' : function ( event ) {
			App.navigate( 'logout', { 'trigger' : true } );
		}

	} );

} );
