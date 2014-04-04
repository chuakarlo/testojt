define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template   = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName'  : 'li'

	} );

} );
