define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/videoInfoItemView.html' );
	var utils      = require( 'videoPlayer/utils/utils' );

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
				return utils.formatTime( this.SegmentLengthInSeconds );
			}

		},

		'showVideoInfo' : function () {
			var self = this;

			this.ui.videoInfo.popover( {
				'html'      : true,
				'trigger'   : 'manual',
				'title'     : this.model.get( 'ContentName' ),
				'placement' : 'bottom',
				'content'   : function () {
					return self.ui.infoContent.html();
				}
			} );

			this.ui.videoInfo.popover( 'toggle' );
		}

	} );

} );
