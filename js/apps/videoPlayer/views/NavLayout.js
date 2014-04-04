define( function ( require ) {
	'use strict';

	/**
	 * Dummy layout for navigation
	 */

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!videoPlayer/templates/navLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {},

		'className' : 'nav-bar'

	} );

} );
