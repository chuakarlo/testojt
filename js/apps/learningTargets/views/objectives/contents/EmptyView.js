define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!apps/learningTargets/templates/objectives/emptycontent.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'tr'
	} );

} );
