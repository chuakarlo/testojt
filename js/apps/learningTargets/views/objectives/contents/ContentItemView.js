define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/objectives/focuscontent.html' );
	var _               = require( 'underscore' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
		'tagName'   : 'li',
		'className' : 'col-xs-6 col-sm-6 col-md-4'
	} );

} );
