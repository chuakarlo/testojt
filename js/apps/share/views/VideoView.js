define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template      = require( 'text!share/templates/VideoTemplate.html' );
	var timeFormatter = require( 'common/helpers/convertSecsToMins' );
	var getConfig     = require( 'common/helpers/getConfig' );

	require( 'videoPlayer/plugins/selectText' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'id'        : 'video-info',
		'className' : 'col-xs-12',

		'ui' : {
			'videoUrl' : '.share-content-url'
		},

		'events' : {
			'click @ui.videoUrl' : 'selectVideoUrl'
		},

		'selectVideoUrl' : function () {
			this.ui.videoUrl.selectText();
		},

		'getImageUrl' : function () {
			// user uploaded video
			if ( this.model.get( 'Uploaded' ) ) {
				return 'img/pd-360.jpg';
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
