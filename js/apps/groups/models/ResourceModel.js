define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'defaults' : {
			'ResourceName'        : 'Default resource title',
			'ResourceDescription' : 'This is a default description'
		}

	} );

} );