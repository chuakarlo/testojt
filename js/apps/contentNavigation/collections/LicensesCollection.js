define( function ( require ) {

	'use strict';

	var Backbone		 = require( 'backbone' );
	var LicenseModel	 = require( '../models/LicenseModel' );

	return Backbone.Collection.extend( {
		'model'  : LicenseModel
	} );

} );