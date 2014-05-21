define( function ( require ) {
	'use strict';

	var App                    = require( 'App' );
	var Marionette             = require( 'marionette' );
	var _                      = require( 'underscore' );
	var template               = require( 'text!user/templates/login/forgotPasswordView.html' );
	var ForgotPasswordFormView = require( 'user/views/login/ForgotPasswordFormView' );
	var ErrorView              = require( 'apps/user/views/login/ErrorView' );
	var Backbone               = require( 'backbone' );

	require( 'validation' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'formRegion'   : '.forgot-password-form-holder',
			'helperRegion' : '.helper-holder'
		},

		'onShow' : function () {

			var self      = this;

			var personnelModel = new App.Entities.Personnel();

			personnelModel.setupForgotPasswordValidation();

			var forgotPasswordFormView = new ForgotPasswordFormView( {

				model : personnelModel

			} );

			this.formRegion.show( forgotPasswordFormView );

			var errorView = new ErrorView( {

				model : personnelModel

			} );

			Backbone.Validation.bind( forgotPasswordFormView );

			personnelModel.bind( 'validated' , function ( isValid, model, errors ) {

				if ( isValid ) {

					var personnelRequest = App.request( 'user:byEmail', model.get( 'email' ) );
					self.helperRegion.show( new App.Common.LoadingView( {
						'size' : 'small'
					} ) );

					App.when( personnelRequest ).done( function ( personnel ) {

						var personnelObj = personnel;

						if ( typeof personnel === 'string' ) {
							personnelObj = JSON.parse ( personnel );
						}

						if ( personnelObj.length ) {
							//TODO email password to user
							// App.request( 'sendpassword:success', personnelObj[0]  );
							App.vent.trigger( 'sendpassword:success' );

						} else {
							errorView.model.set( 'error', 'Sorry, we don\'t have an account using that email address.' );
							self.helperRegion.show( errorView );
						}
					} );

				} else {

					errorView.model.set( 'error', errors.email );
					self.helperRegion.show( errorView );

				}

			});

		},

		'onRender' : function () {

		},

		'initialize' : function ( options ) {

		}

	} );

} );
