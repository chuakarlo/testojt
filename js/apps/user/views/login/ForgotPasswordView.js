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
			'formRegion'  : '.forgot-password-form-holder',
			'errorRegion' : '.error-holder'
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

					App.vent.trigger( 'forgotpassword:success' );

				} else {

					errorView.model.set( 'error', errors.email );
					self.errorRegion.show( errorView );

				}

			});

		},

		'onRender' : function () {

		},

		'initialize' : function ( options ) {

		}

	} );

} );
