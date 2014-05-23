define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/segmentLabelItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'id' : 'label-view'

	} );

} );
