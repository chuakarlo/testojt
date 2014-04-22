define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/settings/reports/reports.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'h1',

		'className' : 'page-header'

	} );

} );
