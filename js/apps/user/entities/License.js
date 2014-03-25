define( function ( require ) {
	'use strict';

	var Remoting   = require( 'Remoting' );
	var Backbone   = require( 'backbone' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );
	var $          = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.License = Backbone.Model.extend( {

			// override sync to do nothing
			'sync' : function () {},

			'idAttribute' : 'LicenseId'

		} );

		Entities.LicenseCollection = Backbone.Collection.extend( {

			// override sync to do nothing
			'sync' : function () {},

			'model' : Entities.License

		} );

		// the list of users licenses
		var licenses;
		var defer;

		var API = {

			'initializeLicenses' : function () {
				// request to get the licenses
				var request = {
					'path'   : 'com.schoolimprovement.pd360.dao.SessionService',
					'method' : 'getUsersLicenses',
					'args'   : {
						'id' : Session.personnelId()
					}
				};

				// promise that will resolve when getting the licenses has completed
				var gettingLicenses = Remoting.fetch( request );

				$.when( gettingLicenses )

					.done( function ( results ) {
						// store licenses
						licenses = new Entities.LicenseCollection( results[ 0 ] );
						defer.resolve( licenses );
					} )

					.fail( function ( error ) {
						defer.reject( error );
					} );
			},

			'getLicenses' : function () {
				// check if we are in process of fetching licenses
				if ( defer && defer.state() !== 'resolved' ) {
					return defer.promise();
				}

				defer = $.Deferred();

				// if licenses were already fetched, return stored licenses
				if ( licenses ) {
					return defer.resolve( licenses );
				}

				// licenses haven't been set, fetch them
				this.initializeLicenses();

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
