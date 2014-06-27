define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Moment   = require( 'moment' );

	return Backbone.CFModel.extend( {

		'path' : 'core.LicenseMessageGateway',

		'getReadOptions' : function () {
			return {
				'method' : 'getValidByLicenseIds',
				'args'   : this.toJSON()
			};
		},

		'parse' : function ( res ) {
			// Return only the first one?
			if (res.length)	{
				var license = res[ 0 ];
				// Strip the HTML
				license.Message = license.Message.replace(/<\/?[^>]+(>|$)/g, '');
				return license;
			}
		},

		// Check to see if the message contains text and is not expired
		'isValidMessage' : function () {
			if ( !this.get( 'Message' )) {
				return false;
			}

			// Check if the message is expired
			var expiredDate = new Moment( this.get( 'ExpireDate' ) );
			var currentDate = new Moment();

			if ( currentDate < expiredDate ) {
				return true;
			}
			return false;

		}
	} );
} );
