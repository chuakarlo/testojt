define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var App        = require( 'App' );

	// template
	var template   = require( 'text!videoPlayer/templates/pageLayout.html' );

	// views
	var VideoPlayerLayout = require( 'videoPlayer/views/VideoPlayerLayout' );
	var ShareVideoLayout  = require( 'videoPlayer/views/share/ShareVideoLayout' );
	var VideoTabsLayout   = require( 'videoPlayer/views/VideoTabsLayout' );

	return Marionette.Layout.extend( {

		'initialize': function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			Vent.on( 'video:show_share_modal', _.bind( this.showShareModal, this ) );

			return this;
		},

		'id' : 'video-player-page',

		'template' : _.template( template ),

		'regions' : {
			'videoPlayerRegion' : '#video-container',
			'videoTabsRegion'   : '#video-tabs'
		},

		'ui' : {
			'infoVideo'         : '#info-video',
			'infoVideoContent'  : '#info-video-content'
		},

		'events' : {
			'mouseenter @ui.infoVideo' : 'showVideoInfo',
			'mouseleave @ui.infoVideo' : 'hideVideoInfo',
		},

		'onShow' : function () {
			this.videoPlayerRegion.show( new VideoPlayerLayout( {
				'model' : this.model
			} ) );

			this.videoTabsRegion.show( new VideoTabsLayout( {
				'model' : this.model
			} ) );
		},

		'showShareModal' : function () {
			var shareLayout = new ShareVideoLayout( {
				'model' : this.model
			} );

			App.modalRegion.show( shareLayout, {
				'className' : 'share-modal'
			} );
		},

		'showVideoInfo' : function ( event ) {
			var self = this;

			this.ui.infoVideo.popover( {
				'html'    : true,
				'trigger' : 'manual',
				'title'   : this.model.get( 'ContentName' ),
				'content' : function () {
					return  self.ui.infoVideoContent.html();
				},
				'placement' : 'bottom'
			} );

			this.ui.infoVideo.popover( 'show' );
		},

		'hideVideoInfo' : function ( event ) {
			this.ui.infoVideo.popover( 'hide' );
		}

	} );

} );
