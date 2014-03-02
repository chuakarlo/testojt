define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/home/home.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'className' : 'container sub-page-header'
	} );

} );
