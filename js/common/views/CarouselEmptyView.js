define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!common/templates/carouselEmptyView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'className' : 'empty-view',

		'tagName'   : 'h3'

	} );

} );
