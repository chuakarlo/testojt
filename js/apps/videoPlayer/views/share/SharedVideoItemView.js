define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var utils      = require( 'videoPlayer/utils/utils' );

	require( 'videoPlayer/plugins/selectText' );

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

		'selectVideoUrl' : function () {
			this.ui.videoUrl.selectText();
		},

		'templateHelpers' : {

			'getImageUrl' : function () {
				return 'http://resources.pd360.com/PD360/media/thumb/' + this.ImageURL;
			},

			'getSegmentLength' : function () {
				return utils.formatTime( this.SegmentLengthInSeconds );
			},

			'getVideoUrl' : function () {
				return 'http://www.pd360.com/index.cfm?ContentId=' + this.ContentId;
			}
		}

	} );

} );
