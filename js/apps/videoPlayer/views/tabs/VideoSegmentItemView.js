define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!videoPlayer/templates/tabs/videoSegmentItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'tagName'   : 'div'

	} );

} );
