define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	require( 'videoPlayer/utils/captionToggle' );
	var template = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'initialize' : function () {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.listenTo( this, 'show', this.initializePlayer );
			this.listenTo( this, 'afterPlayerInit', this.startTracking );
		},

		'initializePlayer' : function () {
			var player = videojs( 'example-video', {
				'controls'               : true,
				'techOrder'              : [ 'flash', 'html5' ],
				'nativeControlsForTouch' : false
			} );
			player.ccToggle();

			this.trigger( 'afterPlayerInit', player );
		},

		'startTracking' : function ( player ) {
			// Here we'll track the player time manually
			// so we won't depend on the player element
			// being available in reporting video progress
			// when page navigates to a different route.
			player.on( 'timeupdate', function () {
				this.model.set( 'currentTime' , player.currentTime() );
			}.bind( this ) );

			this.bindPlayerEvents( player );
			this.bindPlayerCleanup( player, window );
		},

		// Tracked currentTime when video is paused and ended
		'bindPlayerEvents' : function ( player ) {

			player.on( 'pause', function () {
				this.model.updateProgress();
			}.bind( this ) );

			player.on( 'ended', function () {
				this.model.updateProgress();
			}.bind( this ) );

		},

		// Destroys player instance when page navigates to a different route
		'bindPlayerCleanup' : function ( player, element ) {

			$( element ).on( 'hashchange.bindPlayerCleanup', function () {
				// If currentTime is not equal 0 that means video was played, then
				// update progress before disposing player instance.
				if ( this.model.get( 'currentTime' ) !== 0) {
					this.model.updateProgress();
					this.model.set( 'currentTime', 0 );
				}
				player.dispose();
				$( element ).off( 'hashchange.bindPlayerCleanup' );
			}.bind( this ) );
		}

	} );

} );
