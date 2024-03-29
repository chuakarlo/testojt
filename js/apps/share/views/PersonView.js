define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template = require( 'text!share/templates/PersonTemplate.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li',

		'triggers' : {
			'click .result-item'      : 'share:selectedItem',
			'mouseenter .result-item' : 'item:highlight'
		}

	} );

} );
