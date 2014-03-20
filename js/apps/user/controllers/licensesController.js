define( function ( require ) {
	'use strict';

	var Remoting = require( 'Remoting' );
	var Session  = require( 'Session' );
	var $        = require( 'jquery' );

	return function ( Licenses, App ) {

		// the list of users licenses
		var licenses;

		var getUsersLicenses = function ( deferred ) {

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
					licenses = results[ 0 ];
					deferred.resolve( licenses );
				} )

				.fail( function ( error ) {
					deferred.reject( error );
				} );
		};

		var defer;

		// public method to get a users licenses
		Licenses.getLicenses = function () {
			// check if we are in process of fetching licenses
			defer = defer || $.Deferred();

			// if licenses were already fetched, return stored licenses
			if ( licenses ) {
				return defer.resolve( licenses );
			}

			// licenses haven't been set, fetch them
			getUsersLicenses( defer );

			return defer.promise();
		};

		// public method to clear a users list of licenses
		Licenses.clear = function () {
			licenses = null;
		};

		App.reqres.setHandler( 'user:licenses', function () {
			return Licenses.getLicenses();
		} );

	};
	
} );
