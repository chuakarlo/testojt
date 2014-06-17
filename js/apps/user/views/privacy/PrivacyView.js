define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/privacy/privacyView.html' );

	require( 'validation' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template )

	} );

} );
