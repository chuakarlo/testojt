define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/objectives/content.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-md-4'
	} );

} );
