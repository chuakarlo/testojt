define( function ( require ) {
	'use strict';

	var _   = require( 'underscore' );
	var App = require( 'App' );

	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Show = {

			'showVideo' : function ( videoId ) {

				var getVideoContent;

				App.content.show( new App.Common.LoadingView() );

				// get URL query
				var queryObj = App.request( 'videoPlayer:queryObject' );

				// check if the video is user uploaded or not
				if ( queryObj.uuv ) {
					getVideoContent = App.request( 'video:userUploaded', videoId );
				} else {
					getVideoContent = App.request( 'videoPlayer:getVideoContent', videoId );
				}

				App.when( getVideoContent ).done( function ( videoContent ) {

					this.showVideoResources( videoContent );

				}.bind( this ) ).fail( function ( error ) {

					App.errorHandler( {
						'region'   : App.content,
						'viewText' : error.message
					} );

				} );

			},

			'showVideoResources' : function ( videoModel ) {

				var questionsRequest     = App.request( 'videoPlayer:questions', videoModel.id );
				var relatedVideosRequest = App.request( 'videoPlayer:relatedVideos', videoModel );
				var queueContentsRequest = App.request( 'common:getQueueContents' );
				var segmentsRequest      = App.request( 'videoPlayer:segments', videoModel );

				var viewingId = videoModel.getViewingId();

				App.when( questionsRequest, queueContentsRequest, segmentsRequest, relatedVideosRequest, viewingId ).done( function ( questions, queueContents, segments, relatedVideos ) {
					if ( !App.request( 'videoPlayer:isVideosRoute' ) ) {
						return;
					}

					var layout = new App.VideoPlayer.Views.PageLayout( {
						'model' : videoModel
					} );
					App.content.show( layout );

					// get all queue contents ids
					var queueContentsIds = [ ];
					_.each( queueContents.models, function ( model ) {
						queueContentsIds.push( model.id );
					} );

					// set content queued attribute
					videoModel.setQueue( queueContentsIds );

					// set video segments queued attribute
					segments.each( function ( model ) {
						model.setQueue( queueContentsIds );
					} );

					// set related videos queued attribute
					relatedVideos.each( function ( model ) {
						model.setQueue( queueContentsIds );
					} );

					// if there are other segments available
					if ( !segments.isEmpty() ) {
						var segmentsView = new App.VideoPlayer.Views.VideoCollectionView( {
							'collection' : segments
						} );
						layout.segmentLabelRegion.show( new App.VideoPlayer.Views.SegmentLabelItemView() );
						layout.videoSegmentsRegion.show( segmentsView );

						// get all segments ids of other segments
						var segmentIds = segments.pluck( 'ContentId' );
						// find where is the id of next segment in segmentsIds
						var index = _.sortedIndex(  segmentIds , videoModel.id );
						if ( index < segmentIds.length ) {
							// add the next segment to video model for overlay at the end of vid
							videoModel.next = segments.at( index );
						}
					}

					// Videojs player view
					var videoPlayerView = new App.VideoPlayer.Views.VideoPlayerView( {
						'model' : videoModel
					} );
					layout.playerRegion.show( videoPlayerView );

					// Questions view
					var questionsCollection = new QuestionsCollection();
					questionsCollection.reset( questions );
					// Set question ContentTypeId based on video ContentTypeId.
					// This is used to when saving the set of questions.
					questionsCollection.map( function ( question ) {
						question.set( 'ContentTypeId', videoModel.get( 'ContentTypeId' ) );
					} );

					var questionsView = new App.VideoPlayer.Views.QuestionsView( {
						'collection' : questionsCollection
					} );
					layout.questionsRegion.show( questionsView );

					// show video buttons view
					var videoButtonsView = new App.VideoPlayer.Views.VideoButtonsView( {
						'model' : videoModel
					} );
					layout.videoButtonsRegion.show( videoButtonsView );

					// show video resources
					var resources     = App.request( 'videoPlayer:getVideoResources', videoModel );
					var resourcesView = new App.VideoPlayer.Views.ResourcesView( {
						'collection' : resources
					} );
					layout.videoResourcesRegion.show( resourcesView );

					//show related vids
					var relatedView = new App.VideoPlayer.Views.VideoCollectionView( {
						'collection' : relatedVideos
					} );
					layout.relatedVideosRegion.show( relatedView );

					// show video tabs view
					var videoTabsView = new App.VideoPlayer.Views.VideoTabsView();
					layout.videoTabsRegion.show( videoTabsView );

				} ).fail( App.errorHandler.bind( App, { 'region' : App.content } ) );

			},

			'showShareVideoDialog' : function ( model ) {

				window.showSharedModal( {

					'type' : 'video',

					'data' : {
						'model' : model
					}

				} );

			}

		};

	} );

} );
