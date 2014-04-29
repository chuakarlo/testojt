define( function ( require ) {
	'use strict';

	var $               = require( 'jquery' );
	var sinon           = window.sinon;
	var Backbone        = require( 'backbone' );
	var VideoPlayerView = require( 'videoPlayer/views/player/VideoPlayerView' );

	var player     = Backbone.Events;
	var SpiedModel = Backbone.Model.extend( {
		'save' : sinon.spy()
	} );

	describe( 'VideoPlayerView', function () {
		var videoPlayerView = new VideoPlayerView( {
			'model' : new SpiedModel()
		} );

		it( 'is an instance', function () {
			videoPlayerView.should.be.an.instanceof( VideoPlayerView );
		} );

		describe( '.startTracking', function () {

			before( function () {
				player.currentTime = sinon.spy();
				player.dispose = sinon.spy();
				videoPlayerView.startTracking( player );
			} );

			it( 'calls player currentTime method on timeupdate event', function () {
				player.currentTime.should.have.callCount( 0 );
				player.trigger( 'timeupdate' );
				player.currentTime.should.have.callCount( 1 );
			} );

			it( 'reports video progress when video is paused and ends', function () {
				videoPlayerView.model.save.should.have.callCount( 0 );

				player.trigger( 'pause' );
				videoPlayerView.model.save.should.have.callCount( 1 );

				player.trigger( 'ended' );
				videoPlayerView.model.save.should.have.callCount( 2 );

				videoPlayerView.model.save.reset();
			} );

			it( 'reports video progress when page navigates and video is played', function () {
				videoPlayerView.model.set( 'currentTime', 1 );
				$( window ).trigger( 'hashchange' );
				player.dispose.should.have.callCount( 1 );
				videoPlayerView.model.save.should.have.callCount( 1 );
			} );

		} );

	} );

} );
