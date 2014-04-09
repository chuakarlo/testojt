define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	require( 'videoPlayer/utils/selectText' );

	// template
	var template   = require( 'text!videoPlayer/templates/share/sharedVideoItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'video-info',

		'ui' : {
			'videoUrl' : '.video-url'
		},

		'events' : {
			'click @ui.videoUrl' : 'selectVideoUrl'
		},

		'selectVideoUrl' : function ( event ) {
			this.ui.videoUrl.selectText();
		}

	} );

} );
