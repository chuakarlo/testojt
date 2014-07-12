define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var API = {

		'hasObsAccess' : function () {
			var privileges = App.request( 'user:privileges' );
			var hasLicense = App.request( 'user:licenses:hasObservation' );

			return privileges.isTemplateObserver() || privileges.isTemplateOwner() || hasLicense;
		}

	};

	App.reqres.setHandler( 'user:hasObsAccess', function () {
		return API.hasObsAccess();
	} );

} );
