define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	// template
	var template = require( 'text!videoPlayer/templates/share/searchResultItemView.html' );

	return Marionette.ItemView.extend( {

		'initialize' : function () {},

		'template' : _.template( template ),

		'tagName' : 'li',

		'triggers' : {
			'mousedown .result-item' : 'item:selected'
		}

	} );

} );
