define( function ( require ) {
	'use strict';

	var _            = require( 'underscore' );
	var Marionette   = require( 'marionette' );
	var App          = require( 'App' );

	var InfoItemView = require( 'videoPlayer/views/VideoInfoItemView' );
	var template     = require( 'text!videoPlayer/templates/videoPageLayout.html' );

	return Marionette.Layout.extend( {

		'id' : 'video-player-page',

		'template' : _.template( template ),

		'ui' : {
			'videoInfo' : '#info-icon'
		},

		'events' : {
			'click @ui.videoInfo' : 'showVideoInfo'
		},

		'regions' : {
			'playerRegion'         : '#video-player',
			'questionsRegion'      : '#video-questions',
			'videoButtonsRegion'   : '#video-buttons',
			'videoTabsRegion'      : '#video-tabs',
			'videoResourcesRegion' : '#video-resource',
			'segmentLabelRegion'   : '#segment-label',
			'videoSegmentsRegion'  : '#video-segment',
			'relatedVideosRegion'  : '#related-videos'
		},

		'showVideoInfo' : function ( e ) {
			e.preventDefault();

			var infoItemView = new InfoItemView( { 'model' : this.model } );

			App.modalRegion.show( infoItemView, {
				'className' : 'info-modal'
			} );

		}

	} );

} );
