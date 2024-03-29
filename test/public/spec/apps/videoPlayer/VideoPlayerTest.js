/* eslint max-nested-callbacks: [2, 5] */
define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'videoPlayer/VideoPlayer' )();
	require( 'videoPlayer/entities/Entities' );

	describe( 'VideoPlayer Module', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );

			var licenseStub = sinon.stub().returns( new Backbone.Collection() );
			App.reqres.setHandler( 'user:licenses', licenseStub );

			var truthStub = sinon.stub().returns( true );
			App.reqres.setHandler( 'videoPlayer:isVideosRoute', truthStub );

			var queryObjectStub = sinon.stub().returns( { } );
			App.reqres.setHandler( 'videoPlayer:queryObject', queryObjectStub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.reqres.removeHandler( 'user:licenses' );
			App.reqres.removeHandler( 'videoPlayer:isVideosRoute' );
			App.reqres.removeHandler( 'videoPlayer:queryObject' );
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

				before( function () {
					var stub = sinon.stub().returns( model );
					App.reqres.setHandler( 'videoPlayer:getVideoContent', stub );
				} );

				after( function () {
					App.reqres.removeHandler( 'videoPlayer:getVideoContent' );
				} );

				it( 'should make call for video info and call .showVideoResources', function () {
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

				var model = new App.VideoPlayer.Entities.Content( null, {
					'getViewingId' : sinon.stub().returns( 0 )
				} );

				var collection = new App.VideoPlayer.Entities.RelatedVideos( null, {
					'isQueued' : sinon.stub().returns( false )
				} );

				before( function () {
					collection.reset( [ { }, { } ] );
					var stub = sinon.stub().returns( collection );
					App.reqres.setHandler( 'common:getQueueContents', stub );
					App.reqres.setHandler( 'videoPlayer:questions', stub );
					App.reqres.setHandler( 'videoPlayer:relatedVideos', stub );
					App.reqres.setHandler( 'videoPlayer:getVideoResources', stub );
					App.reqres.setHandler( 'videoPlayer:segments', stub );
				} );

				after( function () {
					App.reqres.removeHandler( 'common:getQueueContents' );
					App.reqres.removeHandler( 'videoPlayer:questions' );
					App.reqres.removeHandler( 'videoPlayer:relatedVideos' );
					App.reqres.removeHandler( 'videoPlayer:getVideoResources' );
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
						'segmentLabelRegion'   : { 'show' : showSpy },
						'videoSegmentsRegion'  : { 'show' : showSpy },
						'videoResourcesRegion' : { 'show' : showSpy },
						'relatedVideosRegion'  : { 'show' : showSpy }
					} );

					// Call showVideoResources
					App.VideoPlayer.Controller.Show.showVideoResources( model );

					// should have created a new layout
					/*jshint -W030*/
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

	} );

} );
