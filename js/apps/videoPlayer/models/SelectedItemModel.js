define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'initialize' : function () {},

		'defaults' : {
			'name'  : '',
			'email' : ''
		}

	} );

} );