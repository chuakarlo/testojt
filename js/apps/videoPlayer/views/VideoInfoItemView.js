define( function ( require ) {
	'use strict';

	var _            = require( 'underscore' );
	var Marionette   = require( 'marionette' );
	var template     = require( 'text!videoPlayer/templates/videoInfoItemView.html' );
	var hhmmssFormat = require( 'videoPlayer/utils/toHHMMSSFormat' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'videoInfo'   : '#info-icon',
			'infoContent' : '#info-video-content'
		},

		'events' : {
			'click @ui.videoInfo' : 'showVideoInfo'
		},

		'templateHelpers' : {

			'duration' : function () {
				return hhmmssFormat( this.SegmentLengthInSeconds );
			}

		},

		'showVideoInfo' : function () {
			var self = this;

			this.ui.videoInfo.popover( {
				'html'    : true,
				'trigger' : 'manual',
				'title'   : this.model.get( 'ContentName' ),
				'content' : function () {
					return  self.ui.infoContent.html();
				},
				'placement' : 'bottom'
			} );

			this.ui.videoInfo.popover( 'toggle' );
		}

	} );

} );