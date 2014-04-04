define( function ( require ) {
	'use strict';

	require( 'jquery' );

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!videoPlayer/templates/videoPlayerLayout.html' );
	var videojs    = require( 'videojs' );

	var PlayerItemView      = require( 'videoPlayer/views/player/PlayerItemView' );
	var ReflectionLayout    = require( 'videoPlayer/views/reflection/ReflectionLayout' );
	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'playerRegion'     : '#video-player',
			'reflectionRegion' : '#video-reflection',
		},

		'initialize' : function ( options ) {
			videojs.options.flash.swf = 'js/libs/videojs/video-js.swf';

			this.playerItemView = new PlayerItemView( );
			this.listenTo( this.playerItemView, 'show', this.initializePlayer );
		},

		'onShow' : function () {
			this.playerRegion.show( this.playerItemView );
			this.reflectionRegion.show( new ReflectionLayout( {
				'collection' : new QuestionsCollection()
			} ) );
		},

		'initializePlayer' : function () {
			videojs( 'example-video', {
				'controls'               : true,
				'techOrder'              : [ 'flash', 'html5' ],
				'nativeControlsForTouch' : false
			} );
		}
	} );
} );
