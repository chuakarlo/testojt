define( function( require ) {
	'use strict';
	
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'videoPlayer/VideoPlayer' );

	describe( 'VideoPlayer Module', function () {
		
		after( function () {
			App.module( 'VideoPlayer' ).stop();
		} );

		it( 'should create module VideoPlayer', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.be.an.instanceof( Marionette.Module );
			App.VideoPlayer.should.have.property( 'Router' );
		} );

		describe( 'Controller', function () {
			
			it( 'creates controller `Show`', function () {
				App.VideoPlayer.should.have.property( 'Controller' );
				App.VideoPlayer.Controller.should.have.property( 'Show' );
				App.VideoPlayer.Controller.Show.should.have.property( 'showVideo' );
				App.VideoPlayer.Controller.Show.should.have.property( 'showVideoResources' );
			} );

			it( '.showVideo should make call for video info and call .showVideoResources', function () {
				var fakeVideoInfo = [ { 'ContentId' : 123 } ];
				var showVideoResources = sinon.stub( App.VideoPlayer.Controller.Show, 'showVideoResources' );
				var remotingStub = sinon.stub( Remoting, 'fetch' ).returns( fakeVideoInfo );
				
				App.VideoPlayer.Controller.Show.showVideo( 123 );
				
				// data have been fetched
				remotingStub.should.have.callCount( 1 );
				
				// showVideoResources have been called
				showVideoResources.should.have.callCount( 1 );
				
				// showVideoResources have been called with data
				showVideoResources.should.have.been.calledWith( fakeVideoInfo[ 0 ] );

				// restore stubs
				App.VideoPlayer.Controller.Show.showVideoResources.restore();
				Remoting.fetch.restore();
			} );

			it( '.showVideoResources should request for video resources and display layout', function () {
				var fakeVideoInfo = { 'ContentId' : 123 };
				var fakeQuestions = {
					'QuestionText' : '',
					'AnswerText' : ''
				};
				var fakeVideos = [ {}, { 'ContentId' : 123 } ];
				var fakeData = [ fakeVideos, [ fakeQuestions ] ];

				var showStub = sinon.stub( App.content, 'show' );
				var remotingStub = sinon.stub( Remoting, 'fetch').returns( fakeData );

				var showSpy = sinon.spy();
				var layout = sinon.stub( App.VideoPlayer.Views, 'PageLayout' ).returns( {
					'playerRegion'    : { 'show' : showSpy },
					'questionsRegion' : { 'show' : showSpy }
				} );

				// Call showVideoResources
				App.VideoPlayer.Controller.Show.showVideoResources( fakeVideoInfo );

				// data have been requested
				remotingStub.should.have.callCount( 1 );

				// should have created a new layout
				layout.should.have.been.calledWithNew;

				// App should have shown layout
				showStub.should.have.callCount( 1 );

				// regions should have called show
				showSpy.should.have.callCount( 1 );

				// Restoring stubs
				Remoting.fetch.restore();
				App.content.show.restore();
				App.VideoPlayer.Views.PageLayout.restore();
			} );

		} );

	} );

} );
