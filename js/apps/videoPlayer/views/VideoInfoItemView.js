define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/videoInfoItemView.html' );
	var utils      = require( 'videoPlayer/utils/utils' );
	var stripHtml  = require( 'common/helpers/stripHtml' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'ui' : {
			'videoInfo'    : '#info-icon',
			'infoContent'  : '#info-video-content',
			'infoBackdrop' : '#info-video-backdrop'
		},

		'events' : {
			'click @ui.videoInfo'    : 'showVideoInfo',
			'click @ui.infoBackdrop' : 'showVideoInfoBackdrop'
		},

		'templateHelpers' : {

			'duration' : function () {
				return utils.formatTime( this.SegmentLengthInSeconds );
			},

			'description' : function () {
				var info = stripHtml( this.ContentDescription );

				if ( info.length === 0 ) {
					info = 'This video has no description provided.';
				}

				return info;
			}
		},

		'showVideoInfo' : function () {
			var self = this;
			this.ui.infoBackdrop.show();
			this.ui.videoInfo.toggleClass( 'clicked-icon' );
			this.ui.videoInfo.popover( {
				'html'      : true,
				'trigger'   : 'manual',
				'title'     : this.model.get( 'ContentName' ),
				'placement' : function () {
					var width = $( window ).width();
					return width <= 600 ? 'left' : 'bottom';
				},
				'content'   : function () {
					return self.ui.infoContent.html();
				}
			} );

			this.ui.videoInfo.popover( 'toggle' );
		},

		'showVideoInfoBackdrop' : function () {
			this.ui.infoBackdrop.hide();
			this.ui.videoInfo.popover( 'toggle' );
			this.ui.videoInfo.toggleClass( 'clicked-icon' );
		}

	} );

} );
