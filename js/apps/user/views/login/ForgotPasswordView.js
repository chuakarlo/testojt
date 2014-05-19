define( function ( require ) {
	'use strict';

	var App                    = require( 'App' );
	var Marionette             = require( 'marionette' );
	var _                      = require( 'underscore' );
	var template               = require( 'text!user/templates/login/forgotPasswordView.html' );
	var ForgotPasswordFormView = require( 'user/views/login/ForgotPasswordFormView' );
	var ErrorView              = require( 'apps/user/views/login/ErrorView' );
	var UserModel              = require( 'apps/user/models/UserModel' );
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
			var userModel = new UserModel();

			var forgotPasswordFormView = new ForgotPasswordFormView( {

				model : userModel

			} );

			this.formRegion.show( forgotPasswordFormView );

			var errorView = new ErrorView( {

				model : userModel

			} );

			Backbone.Validation.bind( forgotPasswordFormView );

			userModel.bind( 'validated' , function ( isValid, model, errors ) {

				if ( isValid ) {
					var userRequest = App.request( 'user:byEmail', model.get( 'email' ) );
					self.helperRegion.show( new App.Common.LoadingView( {
						'size' : 'small'
					} ) );

					App.when( userRequest ).done( function ( user ) {

						var userObj = JSON.parse( user );

						if ( userObj.length ) {

							App.vent.trigger( 'forgotpassword:success' );

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
