define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var VideoResourcesCollectionView = require( 'videoPlayer/views/tabs/VideoResourcesCollectionView' );
	var VideoSegmentCollectionView   = require( 'videoPlayer/views/tabs/VideoSegmentCollectionView' );
	var VideoResourcesCollection     = require( 'videoPlayer/collections/VideoResourcesCollection' );
	var VideoSegmentCollection       = require( 'videoPlayer/collections/VideoSegmentCollection' );
	var template                     = require( 'text!videoPlayer/templates/tabs/additionalResourcesLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'videoResourceRegion' : '.video-resource',
			'videoSegmentRegion'  : '.video-segment'
		},

		'className' : 'additional-resources',

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			return this;
		},

		'onShow' : function () {
			this.videoResourceRegion.show( new VideoResourcesCollectionView( {
				'Content'    : this.Content,
				'collection' : new VideoResourcesCollection()
			} ) );

			this.videoSegmentRegion.show( new VideoSegmentCollectionView( {
				'Content'    : this.Content,
				'collection' : new VideoSegmentCollection()
			} ) );
		}

	} );

} );
