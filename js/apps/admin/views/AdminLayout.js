define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!admin/templates/AdminLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'content' : '#admin-content'
		}

	} );

} );
