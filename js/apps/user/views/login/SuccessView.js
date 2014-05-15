define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!user/templates/login/successView.html' );
	require( 'validation' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'successRegion' : '#success-content'
		}

	} );

} );
