define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var API = {

		'hasObsAccess' : function () {

			var privileges     = App.request( 'user:privileges' );
			var licenseRequest = App.request( 'user:licenses:hasObservation' );

			return privileges.isTemplateObserver() || privileges.isTemplateOwner() || licenseRequest;

		}

	};

	App.reqres.setHandler( 'user:hasObsAccess', function () {
		return API.hasObsAccess();
	} );

} );
