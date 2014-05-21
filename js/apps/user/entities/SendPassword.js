define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	// var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	var userInfo   = '';

	App.module( 'Entities', function ( Entities ) {

		Entities.SendPassword = Backbone.CFModel.extend( {

			'path' : 'EmailService',

			'getReadOptions' : function () {

				return {
					'method' : 'sendPasswordEmail',
					'args'   : {
						'emailTo' : 'userInfo.EmailAddress'
						// 'personnelId' : userInfo.persId
					}
				};
			}

		} );

	} );

	var API = {

		'getPassword' : function ( options ) {
			var defer = $.Deferred();

			var password = new App.Entities.SendPassword();
			userInfo = {
				email  : options.EmailAddress,
				persId : options.PersonnelId
			};

			password.fetch( {

				'success' : function () {
					defer.resolve( password );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching password' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'sendpassword:success', function ( options ) {
		return API.getPassword( options );
	} );

} );
