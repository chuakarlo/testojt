define( function( require ) {
	'use strict';

	var moment     = require( 'moment' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'videoPlayer/VideoPlayer' );

	describe( 'VideoPlayer Module', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'VideoPlayer' ).stop();
		} );

		it( 'should create module VideoPlayer', function () {
			App.should.have.property( 'VideoPlayer' );
			App.VideoPlayer.should.be.an.instanceof( Marionette.Module );
			App.VideoPlayer.should.have.property( 'Router' );
		} );

		describe( 'Show Controller', function () {

			it( 'is attached to `App`', function () {
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
				showSpy.should.have.callCount( 2 );

				// Restoring stubs
				Remoting.fetch.restore();
				App.content.show.restore();
				App.VideoPlayer.Views.PageLayout.restore();
			} );

		} );

		describe( 'Filter Controller', function () {

			it( 'is attached to `App`', function () {
				App.VideoPlayer.should.have.property( 'Controller' );
				App.VideoPlayer.Controller.should.have.property( 'Filter' );
				App.VideoPlayer.Controller.Filter.should.have.property( 'filterQuestions' );
			 } );

			 describe( '.filterQuestions', function () {

				 it( 'should return followup questions after a specified time', function ( done ) {
					 var options = {
						'timezone': 'MST7MDT',
						'duration': 'seconds',
						'timeDuration': 1
					 };

					 var fakeData = [ {
						 'Created' : moment().tz( options.timezone ).format( 'MMMM, D YYYY h:mm:ss' ),
						 'QuestionTypeId' : 1
					 }, {
						 'QuestionTypeId' : 2
					 } ];

					 setTimeout( function () {
						 var questions = App.VideoPlayer.Controller.Filter.filterQuestions( fakeData, options );
						 questions[0].QuestionTypeId.should.equal( 2 );
						 done();
					 }, 1000 );

				} );

			} );

		} );

	} );

} );
