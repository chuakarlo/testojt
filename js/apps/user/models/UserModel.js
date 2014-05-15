define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		validation : {

			email : {

				required : true,
				pattern  : 'email',
				msg      : 'Invalid email address. Please enter a valid email address to continue (e.g. johnsmith@email.com)'
			}
		}

	} );

} );
