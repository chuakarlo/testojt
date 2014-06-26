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
				return 'img/logo.png';
			}

			return getConfig( 'contentThumbnailPath' ) + this.model.get( 'ImageURL' );
		},

		'templateHelpers' : function () {
			var duration = this.model.get( 'SegmentLengthInSeconds' );
			return {
				'imageUrl'      : this.getImageUrl(),
				'segmentLength' : duration === 0 ? '' : 'Duration: ' + timeFormatter( duration )
			};
		}

	} );
} );
