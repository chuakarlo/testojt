define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var sinon    = window.sinon;

	var Vent              = require( 'Vent' );
	var Remoting          = require( 'Remoting' );
	var VideoPlayerLayout = require( 'videoPlayer/views/VideoPlayerLayout' );
	var ContentModel      = require( 'videoPlayer/models/ContentModel' );

	var videoPlayerLayout;

	describe( 'VideoPlayerLayout', function () {

		before( function () {
			// Spies
			var SpiedLayout = VideoPlayerLayout.extend( {
				'initializePlayer' : sinon.spy(),
				'trackProgress' : sinon.spy()
			} );

			videoPlayerLayout = new SpiedLayout();
		} );

		it( 'should be an instance of VideoContentLayout', function () {
			videoPlayerLayout.should.be.an.instanceof( VideoPlayerLayout );
		} );

		it( 'should have template property', function () {
			videoPlayerLayout.should.have.property( 'template' );
		} );

		it( 'should have regions property', function () {
			videoPlayerLayout.should.have.property( 'regions' );
		} );

		describe( '.onShow', function () {

			before( function () {
				// Stubbing fetch since most ajax calls are executed
				// on showing of regions ( ex. ReflectionLayout onShow )
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
				videoPlayerLayout.render().onShow();
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'should display videoPlayer region', function () {
				var $videoPlayer = videoPlayerLayout.$el.find( '#example-video' );
				$videoPlayer.should.have.length.above( 0 );
			} );

			it( 'should display videoReflection region', function () {
				var $videoReflection = videoPlayerLayout.$el.find( '.content' );
				$videoReflection.should.have.length.above( 0 );
			} );

			it( 'should call initializePlayer method', function () {
				videoPlayerLayout.initializePlayer.should.have.callCount( 1 );
			} );

		} );

		describe( '.trackingProgress', function () {

			it( 'called on videoPlayer:videojsInit event', function () {
				Vent.trigger( 'videoPlayer:videojsInit', Vent );

				videoPlayerLayout.trackProgress.should.have.callCount( 1 );
				videoPlayerLayout.trackProgress.should.have.calledWith( Vent );
			} );

		} );

		describe( '.updateProgress', function () {

			var layout;

			before( function () {
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred );

				var SpiedLayout = VideoPlayerLayout.extend( {
					'updateProgress' : sinon.spy()
				} );

				layout = new SpiedLayout();
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			afterEach( function () {
				layout.updateProgress.reset();
				Vent.off( 'pause ended' );
			} );

			it( 'called on player `pause` event', function () {

				var player = $.extend( { 'currentTime' : function () { return 100; } }, Vent );

				layout.trackProgress( player );
				Vent.trigger( 'pause' );

				layout.updateProgress.should.have.callCount( 1 );
				layout.updateProgress.should.have.been.calledWith( player.currentTime() );
			} );

			it( 'called on player `ended` event', function () {
				
				var player = $.extend( { 'currentTime' : function () { return 100; } }, Vent );

				layout.trackProgress( player );
				Vent.trigger( 'ended' );
				
				layout.updateProgress.should.have.callCount( 1 );
				layout.updateProgress.should.have.been.calledWith( player.currentTime() );
			} );

			it( 'calls Remoting.fetch', function () {
				var model = new ContentModel();
				model.id = 0;

				Remoting.fetch.should.have.callCount( 0 );

				new VideoPlayerLayout( { 'model' : model } ).updateProgress( {} );
				Remoting.fetch.should.have.callCount( 1 );
			} );

		} );
	} );
} );
