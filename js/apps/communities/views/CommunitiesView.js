define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!communities/templates/communities.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'page-header'

	} );

} );
