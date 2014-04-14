define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!videoPlayer/templates/player/playerItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'initialize' : function () {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.listenTo( this, 'show', this.initializePlayer );
			this.listenTo( this, 'afterPlayerInit', this.startTracking.bind( this ) );
			this.listenTo( this, 'afterPlayerInit', this.playerCleanup.bind( this ) );
		},

		'initializePlayer' : function () {

			var player = videojs( 'example-video', {
				'controls'               : true,
				'techOrder'              : [ 'flash', 'html5' ],
				'nativeControlsForTouch' : false
			} );

			this.trigger( 'afterPlayerInit', player );
		},

		'startTracking' : function ( player ) {
			player.on( 'pause', function () {
				this.model.updateProgress( player.currentTime() );
			}.bind( this ) );

			player.on( 'ended', function () {
				this.model.updateProgress( player.currentTime() );
			}.bind( this ) );
		},

		'playerCleanup' : function ( player ) {
			// TODO:
			// Don't trigger dispose if we're still on resources/videos/
			$( window ).on( 'hashchange', function dispose() {
				player.dispose();
				$( window ).off( 'hashchange', dispose );
			} );
		}

	} );

} );
