define( function ( require ) {
	'use strict';

	// libraries
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	require( 'videoPlayer/utils/selectText' );

	// template
	var template = require( 'text!videoPlayer/templates/share/sharedVideoItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'video-info',

		'ui' : {
			'videoUrl' : '.video-url'
		},

		'events' : {
			'click @ui.videoUrl' : 'selectText'
		},

		'selectText' : function ( event ) {
			event.preventDefault();
			$( event.target ).selectText();
		}

	} );

} );
