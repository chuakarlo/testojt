define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var _          = require( 'underscore' );

	var template = require( 'text!user/templates/login/forgotPasswordView.html' );

	require( 'validation' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'eulaRegion' : '#eula-content'
		},

		'events' : {
			'change @ui.email' : 'checkEmail'
		},

		'ui' : {
			'email' : 'input[name=EmailAddress]'
		},

		'onRender' : function () {

		},

		'initialize' : function ( options ) {

		},

		'checkEmail' : function ( event ) {

			if ( this.model.isValid( [ 'EmailAddress' ] ) ) {

				this.ui.email.prop( 'disabled', true );

				var usedRequest = App.request( 'user:byEmail', this.ui.email.val() );

				this.showFlashMessage( 'checkingEmail' );

				App.when( usedRequest ).done( function ( used ) {

					App.flashMessage.close();

					if ( used.length > 2 ) {
						this.showFlashMessage( 'emailUsed' );
					}

				}.bind( this ) ).fail( function () {

					this.showFlashMessage( 'fetchingEmailError' );

				}.bind( this ) ).always( function () {

					this.ui.email.prop( 'disabled', false );

				}.bind( this ));

			}

		}

	} );

} );
