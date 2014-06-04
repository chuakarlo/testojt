define( function ( require ) {
	'use strict';

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
				player.tracker = sinon.spy();
				videoPlayerView.startTracking( player );
			} );

			it( 'calls player tracker', function () {
				player.tracker.should.have.callCount( 1 );
			} );

		} );

	} );

} );
