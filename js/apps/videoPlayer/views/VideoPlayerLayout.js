define( function ( require ) {
	'use strict';

	require( 'jquery' );

	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var videojs    = require( 'videojs' );

	var Vent     = require( 'Vent' );
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
			Vent.on( 'videoPlayer:videojsInit', this.trackProgress.bind( this ) );
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

			Vent.trigger( 'videoPlayer:videojsInit', player );
		},

		'trackProgress' : function ( player ) {
			player.on( 'pause', function () {
				this.updateProgress( player.currentTime() );
			}.bind( this ) );

			player.on( 'ended', function () {
				this.updateProgress( player.currentTime() );
			}.bind( this ) );
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
