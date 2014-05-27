define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var utils      = require( 'videoPlayer/utils/utils' );
	var getConfig  = require( 'common/helpers/getConfig' );

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
				var imageUrl;

				if ( this.Uploaded ) {
					imageUrl = getConfig( 'contentThumbnailPath' ) + 'thumb_2205_PD_sendingmessages.jpg';

				} else {
					imageUrl = getConfig( 'contentThumbnailPath' ) + this.ImageURL;
				}

				return imageUrl;
			},

			'getSegmentLength' : function () {
				return utils.formatTime( this.SegmentLengthInSeconds );
			}
		}

	} );

} );
