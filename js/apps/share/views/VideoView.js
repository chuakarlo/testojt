define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template      = require( 'text!share/templates/VideoTemplate.html' );
	var timeFormatter = require( 'videoPlayer/utils/utils' ).formatTime;
	var getConfig     = require( 'common/helpers/getConfig' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'video-content',

		'getImageUrl' : function () {
			// user uploaded video
			if ( this.model.get( 'Uploaded' ) ) {
				return getConfig( 'contentThumbnailPath' ) + 'thumb_2205_PD_sendingmessages.jpg';
			}

			return getConfig( 'contentThumbnailPath' ) + this.model.get( 'ImageURL' );
		},

		'templateHelpers' : function () {
			return {
				'imageUrl'      : this.getImageUrl(),
				'segmentLength' : timeFormatter( this.model.get( 'SegmentLengthInSeconds' ) )
			};
		}

	} );
} );
