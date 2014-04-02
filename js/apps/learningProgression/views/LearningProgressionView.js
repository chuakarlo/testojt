define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!learningProgression/templates/learningProgression.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'h1',
		'className' : 'container sub-page-header'

	} );
} );
