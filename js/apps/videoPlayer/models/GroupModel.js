define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'idAttribute' : 'LicenseId',

		'initialize' : function () {
			this.set( 'Name', this.get( 'LicenseName' ) );
			this.set( 'Location', '' );
		}

	} );

} );