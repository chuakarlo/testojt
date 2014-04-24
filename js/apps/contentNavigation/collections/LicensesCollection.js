define( function ( require ) {
	
	'use strict';

	var Backbone		 = require( 'backbone' );
	var LicenseModel	 = require( 'apps/contentNavigation/models/LicenseModel' );

	return Backbone.Collection.extend( {
		model  : LicenseModel
	} );

} );