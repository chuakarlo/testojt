define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template = require( 'text!videoPlayer/templates/videoPageLayout.html' );

	return Marionette.Layout.extend( {

		'id' : 'video-player-page',

		'template' : _.template( template ),

		'regions' : {
			'playerRegion'         : '#video-player',
			'questionsRegion'      : '#video-reflection',
			'videoButtonsRegion'   : '#video-buttons',
			'videoTabsRegion'      : '#video-tabs',
			'videoResourcesRegion' : 'video-resource',
			'videoSegmentsRegion'  : '.video-segment',
			'relatedVideosRegion'  : ''
		}

	} );

} );
