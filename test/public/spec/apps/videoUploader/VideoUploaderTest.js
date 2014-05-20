define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'videoUploader/VideoUploader' )();

	describe( 'VideoUploader Module', function () {

		var navigateSpy;
		var loadedSpy;

		before( function () {
			navigateSpy = sinon.spy();
			loadedSpy   = sinon.stub().returns( true );
			App.reqres.setHandler( 'pd360:navigate', navigateSpy );
			App.reqres.setHandler( 'pd360:loaded', loadedSpy );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:navigate' );
			App.reqres.removeHandler( 'pd360:loaded' );
			App.module( 'VideoUploader' ).stop();
			navigateSpy = null;
			loadedSpy   = null;
		} );

		it( 'should create module VideoUploader', function () {

			App.should.have.property( 'VideoUploader' );
			App.VideoUploader.should.be.an.instanceof( Marionette.Module );
			App.VideoUploader.should.have.property( 'Router' );

		} );

		describe( 'Show Submodule', function () {

			it( 'should create the showController', function () {

				App.VideoUploader.should.have.property( 'showController' );
				App.VideoUploader.showController.should.have.property( 'showVideoUploader' );

			} );

			it( '`showVideoUploader` should call PD360.navigate', function () {

				App.VideoUploader.showController.showVideoUploader();

				loadedSpy.should.have.callCount( 1 );
				loadedSpy.should.have.been.calledBefore( navigateSpy );

				navigateSpy.should.have.callCount( 1 );
				navigateSpy.should.have.been.calledWithExactly( 'videos', 'videosUserUploadedVideo' );
			} );

		} );

	} );

} );
