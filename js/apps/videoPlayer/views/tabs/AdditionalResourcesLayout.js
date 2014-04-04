define( function ( require ) {
	'use strict';

	var Marionette                   = require( 'marionette' );
	var _                            = require( 'underscore' );

	var template                     = require( 'text!videoPlayer/templates/tabs/additionalResourcesLayout.html' );
	var VideoResourcesCollectionView = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );
	var VideoSegmentCollectionView   = require( 'videoPlayer/views/tabs/VideoSegmentCollectionView' );
	var VideoResourcesCollection     = require( 'videoPlayer/collections/VideoResourcesCollection' );
	var VideoSegmentCollection       = require( 'videoPlayer/collections/VideoSegmentCollection' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'videoResourceRegion' : '.video-resource',
			'videoSegmentRegion'  : '.video-segment'
		},

		'className' : 'additional-resources',

		'onShow' : function () {
			this.videoResourceRegion.show( new VideoResourcesCollectionView( {
				'collection' : new VideoResourcesCollection()
			} ) );

			this.videoSegmentRegion.show( new VideoSegmentCollectionView( {
				'collection' : new VideoSegmentCollection()
			} ) );
		}

	} );

} );
