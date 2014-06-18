define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!videoPlayer/templates/segment/nextSegmentView.html' );
	var getConfig  = require( 'common/helpers/getConfig' );

	return Marionette.ItemView.extend( {
		'className' : 'content',

		'template' : _.template( template ),

		'initialize' : function ( options ) {
			this.listenTo( this, 'render', this.initSegment );
		},

		'initSegment' : function () {
			if ( $.browser.mobile || $.browser.ipad ) {
				$( '#tab-header' ).addClass( 'tab-header-mobile' );
			} else {
				this.$el.css( 'display', 'none' );

				var video = App.reqres.request( 'videoPlayer:playerView:video' );

				if ( video ) {
					// display Next video in overlay
					video.player.videoOverlay( {
						'imageUrl'     : getConfig( 'contentThumbnailPath' ) + this.model.get( 'ImageURL' ),
						'imageOpacity' : 0.75,
						'clickUrl'     : '#resources/videos/' + this.model.get( 'ContentId' ),
						'overlayText'  : '<div id="video-up-next"><p id="vjs-p-overlay">Up Next:</p><p id="vjs-title-overlay">' + this.model.get( 'ContentName' ) + '</p></div>'
					} );
				}
			}
		}

	} );
} );
