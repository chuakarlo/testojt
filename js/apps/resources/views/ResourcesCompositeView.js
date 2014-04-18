define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!resources/templates/ResourcesCompositeView.html' );
	var _          = require( 'underscore' );

	var resourcesItemView = require( './ResourcesItemView' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'className'         : 'aoeu',
		'itemView'          : resourcesItemView,
		'itemViewContainer' : 'ul'

	} );

} );
