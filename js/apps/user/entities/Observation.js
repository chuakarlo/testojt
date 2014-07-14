define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var API = {

		'hasObsAccess' : function () {
			var defer = App.Deferred();

			var privilegesRequest = App.request( 'user:privileges' );
			var licenseRequest    = App.request( 'user:licenses:hasObservation' );

			App.when( privilegesRequest, licenseRequest )

			.done( function ( privileges, hasLicense  ) {
				var hasAccess = privileges.isTemplateObserver() || privileges.isTemplateOwner() || hasLicense;

				defer.resolve( hasAccess );
			} )

			.fail( function ( error ) {
				defer.reject( error );
			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'user:hasObsAccess', function () {
		return API.hasObsAccess();
	} );

} );
