define( function( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var Remoting   = require( 'Remoting' );
	var sinon      = window.sinon;
	var App        = require( 'App' );
	var Content    = require( 'videoPlayer/models/ContentModel' );

	require( 'common/views' );
	require( 'videoPlayer/VideoPlayer' );

	describe( 'VideoPlayer Module', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );

			var licenseStub = sinon.stub().returns( new Backbone.Collection() );
			App.reqres.setHandler( 'user:licenses', licenseStub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.reqres.removeHandler( 'user:licenses' );
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

			describe( '.showVideo', function () {

				var model = new Backbone.CFCollection();

				before(function () {
					var stub = sinon.stub().returns( model );
					App.reqres.setHandler( 'videoPlayer:getVideoContent', stub );
				} );

				after( function () {
					App.reqres.removeHandler( 'videoPlayer:getVideoContent' );
				} );

				it( 'should make call for video info and call .showVideoResources', function () {
					var fakeVideoInfo      = [ { 'ContentId' : 123 } ];
					var showVideoResources = sinon.stub( App.VideoPlayer.Controller.Show, 'showVideoResources' );
					var showStub           = sinon.stub( App.content, 'show' );

					App.VideoPlayer.Controller.Show.showVideo( 123 );

					// App should have shown layout
					showStub.should.have.callCount( 1 );

					// showVideoResources have been called
					showVideoResources.should.have.callCount( 1 );

					// showVideoResources have been called with data
					showVideoResources.should.have.been.calledWith( model );

					// restore stubs
					App.VideoPlayer.Controller.Show.showVideoResources.restore();
					App.content.show.restore();
				} );

			} );

			describe( '.showVideoResources', function () {

				var model      = new App.VideoPlayer.Entities.Content();
				var collection = new Backbone.CFCollection();

				before( function () {
					var stub = sinon.stub().returns( collection );
					App.reqres.setHandler( 'common:getQueueContents', stub );
					App.reqres.setHandler( 'common:getQueueContents', stub );
					App.reqres.setHandler( 'videoPlayer:questions', stub );
					App.reqres.setHandler( 'videoPlayer:getRelatedVideos', stub );
					App.reqres.setHandler( 'videoPlayer:segments', stub );
				} );

				after( function () {
					App.reqres.removeHandler( 'common:getQueueContents' );
					App.reqres.removeHandler( 'common:getQueueContents' );
					App.reqres.removeHandler( 'common:getQueueContents' );
					App.reqres.removeHandler( 'videoPlayer:questions' );
					App.reqres.removeHandler( 'videoPlayer:getRelatedVideos' );
					App.reqres.removeHandler( 'videoPlayer:segments' );
				} );


				it( 'should request for video resources and display layout', function () {
					var showStub = sinon.stub( App.content, 'show' );
					var showSpy  = sinon.spy();
					var layout   = sinon.stub( App.VideoPlayer.Views, 'PageLayout' ).returns( {
						'playerRegion'         : { 'show' : showSpy },
						'questionsRegion'      : { 'show' : showSpy },
						'videoButtonsRegion'   : { 'show' : showSpy },
						'videoTabsRegion'      : { 'show' : showSpy },
						'videoSegmentsRegion'  : { 'show' : showSpy },
						'videoResourcesRegion' : { 'show' : showSpy },
						'relatedVideosRegion'  : { 'show' : showSpy },
						'videoInfoRegion'      : { 'show' : showSpy }
					} );

					// Call showVideoResources
					App.VideoPlayer.Controller.Show.showVideoResources( model );

					// should have created a new layout
					layout.should.have.been.calledWithNew;

					// App should have shown layout
					showStub.should.have.callCount( 1 );

					// regions should have called show
					showSpy.should.have.callCount( 8 );

					// Restoring stubs
					App.content.show.restore();
					App.VideoPlayer.Views.PageLayout.restore();
				} );

			} );

		} );

		describe( 'Share Controller', function () {

			it( 'it attached to `App`', function () {
				App.VideoPlayer.should.have.property( 'Controller' );
				App.VideoPlayer.Controller.should.have.property( 'Share' );
				App.VideoPlayer.Controller.Share.should.have.property( 'shareVideo' );
			} );

			describe( '.shareVideo', function () {

				it( 'does share video to personnels and groups', function () {
					var remotingFetchStub = sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
					var shareTargets      = {
						'message'    : 'test',
						'personnels' : [ '12345' ],
						'groups'     : [ '67890' ]
					};

					App.VideoPlayer.Controller.Share.shareVideo( shareTargets ).resolve();
					remotingFetchStub.should.have.callCount( 1 );
					Remoting.fetch.restore();
				} );

			} );

		} );

	} );

} );
