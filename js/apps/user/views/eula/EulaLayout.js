define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/eula/eulaLayout.html' );
	var App        = require( 'App' );
	var moment     = require( 'moment' );
	var Ladda      = require( 'ladda' );

	require( 'moment-timezone' );
	require( 'timezone' );

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
			'click @ui.acceptButton'  : 'accept',
			'click @ui.declineButton' : 'decline'
		},

		'accept' : function ( event ) {
			event.preventDefault();

			if ( this.model.isValid( true ) ) {
				var l = Ladda.create( document.querySelector( '#btn-accept' ) );
				l.start();

				var LicenseInitials = this.model.get( 'FirstName' ).charAt( 0 ) + this.model.get( 'LastName' ).charAt( 0 );
				var now             = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss' );

				this.model.set( 'LicenseInitials', LicenseInitials );
				this.model.set( 'LicenseAccepted', now );

				this.model.save( null, {

					'success' : function () {
						l.stop();
						$.cookie( 'EULA', now );
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