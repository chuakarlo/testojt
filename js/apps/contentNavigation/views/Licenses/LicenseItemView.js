define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/Licenses/LicenseItemView.html' );

	return Marionette.ItemView.extend( {
		'tagName'  : 'li',
		'template' : _.template( template )
	} );
} );