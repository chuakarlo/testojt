define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/share/groupItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'groupsResultItem' : '.groups-result-item'
		},

		'triggers' : {
			'mousedown @ui.groupsResultItem' : 'group:selected'
		}

	} );

} );
