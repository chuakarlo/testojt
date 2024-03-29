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
					getVideoContent = App.request( 'videoPlayer:getVideoContent', videoId, queryObj.licenseId );
				}

				App.when( getVideoContent ).done( function ( videoContent ) {

					if ( !App.request( 'videoPlayer:isVideosRoute' ) ) {
						return;
					}

					if ( queryObj.licenseId && queryObj.taskId ) {
						videoContent.set( 'licenseId', queryObj.licenseId );
						videoContent.set( 'taskId', queryObj.taskId );
					}

					this.showVideoResources( videoContent );

				}.bind( this ) ).fail( function ( error ) {

					App.errorHandler( {
						'region'   : App.content,
						'viewText' : error.message
					} );

				} );

			},

			'showVideoResources' : function ( videoModel ) {
				App.when( App.request( 'videoPlayer:questions', videoModel.id ),
					App.request( 'common:getQueueContents' ),
					App.request( 'videoPlayer:segments', videoModel ),
					App.request( 'videoPlayer:relatedVideos', videoModel ),
					videoModel.getViewingId() ).done(
				function ( questions, queueContents, segments, relatedVideos ) {
					if ( !App.request( 'videoPlayer:isVideosRoute' ) ) {
						return;
					}

					var layout = new App.VideoPlayer.Views.PageLayout( {
						'model' : videoModel
					} );

					App.content.show( layout );

					// set content queued attribute
					videoModel.set( 'queued', queueContents.isQueued( videoModel ) );

					// set video segments queued attribute
					segments.each( function ( model ) {
						model.set( 'queued', queueContents.isQueued( model ) );
					} );

					// set related videos queued attribute
					relatedVideos.each( function ( model ) {
						model.set( 'queued', queueContents.isQueued( model ) );
					} );

					// if there are other segments available
					if ( !segments.isEmpty() ) {
						var segmentsView = new App.Common.VideoCarouselView( {
							'collection' : segments,
							'id'         : 'segments-video-carousel'
						} );

						var segmentLabel = new App.VideoPlayer.Views.SegmentLabelItemView( {
							'segmentCount' : segmentsView.collection.length
						} );

						layout.segmentLabelRegion.show( segmentLabel );
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

					// show related vids
					var relatedView = new App.Common.VideoCarouselView( {
						'collection' : relatedVideos,
						'id'         : 'related-videos-carousel'
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
