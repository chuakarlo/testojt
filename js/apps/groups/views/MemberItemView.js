define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/groupMemberView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',
		'className' : 'col-xs-6 col-sm-4 col-md-3'

	} );

} );

