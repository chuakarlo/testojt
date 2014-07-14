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

			'model' : Entities.License,

			'hasObservationLicense' : function () {
				return _.some( this.models, function ( license ) {
					if ( license.get( 'LicenseTypeId' ) === 800 ) {
						return true;
					}

					return false;
				} );
			}

		} );

		// the list of users licenses
		var licenses;
		var fetching = false;
		var defer    = App.Deferred();

		var API = {

			'getLicenses' : function () {

				// Check to see if the defered is resolved or rejected so
				// we don't run into any caching issues.
				var state = defer.state();
				if ( state === 'resolved' || state === 'rejected' ) {
					defer = App.Deferred();
				}

				// if we aren't currently fetching licenses
				if ( !fetching ) {

					if ( licenses ) {

						defer.resolve( licenses );

					} else {

						fetching = true;

						licenses = new Entities.LicenseCollection();
						licenses.fetch( {

							'success' : function ( collection ) {
								fetching = false;
								defer.resolve( licenses );
							},

							'error' : function () {
								fetching = false;
								licenses = null;
								defer.reject( new Error( 'Error fetching licenses' ) );
							}
						} );

					}
				}

				return defer.promise();
			},

			// clear a users list of licenses
			'clear' : function () {
				licenses = null;
			},

			'hasObservationLicense' : function () {
				var defer           = App.Deferred();
				var licensesRequest = this.getLicenses();

				App.when( licensesRequest )

				.done( function ( licenses ) {
					return defer.resolve( licenses.hasObservationLicense() );
				} )

				.fail( function ( error ) {
					return defer.reject( error );
				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'user:licenses', function () {
			return API.getLicenses();
		} );

		App.reqres.setHandler( 'user:licenses:reset', function () {
			return API.clear();
		} );

		App.reqres.setHandler( 'user:licenses:hasObservation', function () {
			return API.hasObservationLicense();
		} );

	} );

} );
