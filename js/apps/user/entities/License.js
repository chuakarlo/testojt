define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

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
					'args' : {
						'id' : Session.personnelId()
					}
				};
			},

			'path' : 'SessionService',

			'model' : Entities.License

		} );

		// the list of users licenses
		var licenses;
		var fetching = false;

		var API = {

			'initializeLicenses' : function ( defer ) {

				// if currently fetching licenses
				if ( fetching ) {
					return defer.promise();
				}

				fetching = true;

				licenses = new Entities.LicenseCollection();

				licenses.fetch( {
					
					'success' : function () {
						fetching = false;
						defer.resolve( licenses );
					},

					'error' : function () {
						fetching = false;
						licenses = null;
						defer.reject( new Error( 'Error fetching licenses' ) );
					}
				} );

			},

			'getLicenses' : function () {
				var defer = $.Deferred();

				// if licenses were already fetched, return stored licenses
				if ( licenses ) {
					return defer.resolve( licenses );
				}

				// licenses haven't been set, fetch them
				this.initializeLicenses( defer );

				return defer.promise();
			},

			// clear a users list of licenses
			'clear' : function () {
				licenses = null;
			}

		};

		App.reqres.setHandler( 'user:licenses', function () {
			return API.getLicenses();
		} );

		App.reqres.setHandler( 'user:licenses:reset', function () {
			return API.clear();
		} );

	} );

} );
