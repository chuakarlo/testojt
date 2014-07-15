define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var _        = require( 'underscore' );

	App.module( 'Entities', function ( Entities ) {

		Entities.License = Backbone.CFModel.extend( {

			// override sync to do nothing
			'sync' : function () {},

			'idAttribute' : 'LicenseId'

		} );

		Entities.LicenseCollection = Backbone.CFCollection.extend( {

			'getReadOptions' : function () {
				return {
					'method' : 'getUsersLicenses',
					'args'   : {
						'id' : Session.personnelId()
					}
				};
			},

			'path' : 'SessionService',

			'model' : Entities.License

		} );

		var API = {

			'getLicenses' : function () {

				var defer = App.Deferred();

				var licenses = new Entities.LicenseCollection();
				licenses.fetch( {

					'success' : function ( collection ) {
						defer.resolve( licenses );
					},

					'error' : function ( error ) {
						defer.reject( new Error( 'Error fetching licenses' ) );
					}

				} );

				return defer.promise();
			},

			'hasObservationLicense' : function () {

				// Check the licenses from the initial login
				return _.some( App.request( 'session:license' ), function ( license ) {
					if ( license.LicenseTypeId === 800 ) {
						return true;
					}

					return false;
				} );

			}

		};

		App.reqres.setHandler( 'user:licenses', function () {
			return API.getLicenses();
		} );

		App.reqres.setHandler( 'user:licenses:hasObservation', function () {
			return API.hasObservationLicense();
		} );

	} );

} );
