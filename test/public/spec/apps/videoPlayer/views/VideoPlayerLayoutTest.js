define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var sinon = window.sinon;

	var Remoting          = require( 'Remoting' );
	var VideoPlayerLayout = require( 'videoPlayer/views/VideoPlayerLayout' );

	var videoPlayerLayout;
	var initializePlayerSpy;

	describe( 'VideoPlayerLayout', function () {

		before( function () {
			initializePlayerSpy = sinon.spy();
			VideoPlayerLayout.prototype.initializePlayer = initializePlayerSpy;
			videoPlayerLayout = new VideoPlayerLayout();
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

		describe( 'onShow', function () {

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
				initializePlayerSpy.should.have.callCount( 1 );
			} );

		} );

	} );

} );
