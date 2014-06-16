define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/observations/observation.html' );
	var _               = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template' : _.template( template ),
		'tagName'  : 'li'
	} );

} );
