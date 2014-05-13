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

			it( '.showVideo should make call for video info and call .showVideoResources', function () {
				var fakeVideoInfo = [ { 'ContentId' : 123 } ];
				var showVideoResources = sinon.stub( App.VideoPlayer.Controller.Show, 'showVideoResources' );
				var remotingStub = sinon.stub( Remoting, 'fetch' ).returns( fakeVideoInfo );
				var showStub = sinon.stub( App.content, 'show' );

				App.VideoPlayer.Controller.Show.showVideo( 123 );

				// App should have shown layout
				showStub.should.have.callCount( 1 );

				// data have been fetched
				remotingStub.should.have.callCount( 1 );

				// showVideoResources have been called
				showVideoResources.should.have.callCount( 1 );

				// showVideoResources have been called with data
				showVideoResources.should.have.been.calledWith( fakeVideoInfo[ 0 ] );

				// restore stubs
				App.VideoPlayer.Controller.Show.showVideoResources.restore();
				Remoting.fetch.restore();
				App.content.show.restore();
			} );


			describe( '.showVideoResources', function () {

				before( function () {
					var stub = sinon.stub().returns( new Backbone.CFCollection() );
					App.reqres.setHandler( 'common:getQueueContents', stub );
					App.reqres.setHandler( 'vq:segment', stub );
				} );

				after( function () {
					App.reqres.removeHandler( 'common:getQueueContents' );
					App.reqres.removeHandler( 'vq:segment' );
				} );


				it( 'should request for video resources and display layout', function () {
					var fakeVideoInfo = {
						'ContentId'          : 123,
						'GuidebookFileName'  : '',
						'AudioFileName'      : '',
						'TranscriptFileName' : ''
					};

					var fakeVideos   = [ { }, { 'ContentId' : 123 } ];

					var fakeData = [ fakeVideos ];

					var showStub = sinon.stub( App.content, 'show' );
					var remotingStub = sinon.stub( Remoting, 'fetch').returns( fakeData );

					var showSpy = sinon.spy();
					var layout = sinon.stub( App.VideoPlayer.Views, 'PageLayout' ).returns( {
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
					App.VideoPlayer.Controller.Show.showVideoResources( fakeVideoInfo );

					// data have been requested
					remotingStub.should.have.callCount( 2 );

					// should have created a new layout
					layout.should.have.been.calledWithNew;

					// App should have shown layout
					showStub.should.have.callCount( 1 );

					// regions should have called show
					showSpy.should.have.callCount( 8 );

					// Restoring stubs
					Remoting.fetch.restore();
					App.content.show.restore();
					App.VideoPlayer.Views.PageLayout.restore();
				} );

			} );

		} );

		describe( 'Queue Controller', function () {

			it( 'it attached to `App`', function () {
				App.VideoPlayer.should.have.property( 'Controller' );
				App.VideoPlayer.Controller.should.have.property( 'Queue' );
				App.VideoPlayer.Controller.Queue.should.have.property( 'addContent' );
				App.VideoPlayer.Controller.Queue.should.have.property( 'removeContent' );
			} );

			describe( '.addContent', function () {

				it( 'does add the content to queue', function () {
					var model = new Content( {
						'queued' : false
					} );

					var remotingFetchStub = sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

					App.VideoPlayer.Controller.Queue.addContent( model ).resolve();

					// content should be added to queue
					model.get( 'queued' ).should.be.true;
					remotingFetchStub.should.have.callCount( 1 );

					Remoting.fetch.restore();
				} );

			} );

			describe( '.removeContent', function () {

				it( 'does remove the content from queue', function () {
					var model = new Content( {
						'queued' : true
					} );

					var remotingFetchStub = sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

					App.VideoPlayer.Controller.Queue.removeContent( model ).resolve();

					// content should be added to queue
					model.get( 'queued' ).should.be.false;
					remotingFetchStub.should.have.callCount( 1 );

					Remoting.fetch.restore();
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
