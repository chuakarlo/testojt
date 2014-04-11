define( function ( require ) {
	'use strict';

	require( 'jquery' );

	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );

	var Session  = require( 'Session' );

	var PlayerItemView      = require( 'videoPlayer/views/player/PlayerItemView' );
	var ReflectionLayout    = require( 'videoPlayer/views/reflection/ReflectionLayout' );
	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );

	var template   = require( 'text!videoPlayer/templates/videoPlayerLayout.html' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'playerRegion'     : '#video-player',
			'reflectionRegion' : '#video-reflection'
		},

		'initialize' : function ( options ) {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.playerItemView = new PlayerItemView( );

			this.listenTo( this.playerItemView, 'show', this.initializePlayer );
			this.listenTo( this, 'player_init', this.trackProgress.bind( this ) );
			this.listenTo( this, 'player_init', this.playerCleanup.bind( this ) );
		},

		'onShow' : function () {
			this.playerRegion.show( this.playerItemView );
			this.reflectionRegion.show( new ReflectionLayout( {
				'collection' : new QuestionsCollection()
			} ) );
		},

		'initializePlayer' : function () {
			var player = videojs( 'example-video', {
				'controls'               : true,
				'techOrder'              : [ 'flash', 'html5' ],
				'nativeControlsForTouch' : false
			} );

			this.trigger( 'player_init', player );
		},

		'trackProgress' : function ( player ) {
			player.on( 'pause', function () {
				this.updateProgress( player.currentTime() );
			}.bind( this ) );

			player.on( 'ended', function () {
				this.updateProgress( player.currentTime() );
			}.bind( this ) );
		},

		'playerCleanup' : function( player ) {
			$( window ).on( 'hashchange', function dispose() {
				player.dispose();
				$( window ).off( 'hashchange', dispose );
			} );
		},

		'updateProgress' : function ( secondsCompleted ) {
			var request = {
				'method' : 'RespondUpdatedViewingTimeWithStatusCheck',
				'args' : {
					'PersonnelId' : Session.personnelId(),
					'ContentId' : this.model.id,
					'ViewingId' : 1,
					'SecondsCompleted' : parseInt( secondsCompleted , 10),
					'licId' : 0, // where to get licenses?
					'taskId' : 0
				}
			};

			$.when( this.model.update( request ) )
				.done( function () {
					// TODO: success handling
				} )
				.fail( function ( error ) {
					// TODO: error handling
				} );
		}
	} );
} );
