define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/share/personItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'poepleResultItem' : '.people-result-item'
		},

		'triggers' : {
			'mousedown @ui.poepleResultItem' : 'person:selected'
		}

	} );

} );
