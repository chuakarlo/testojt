define( function ( require ) {
	'use strict';

	var _   = require( 'underscore' );
	var App = require( 'App' );

	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );
	var ShareVideoLayout    = require( 'videoPlayer/views/share/ShareVideoLayout' );
	var SharedVideoItemView = require( 'videoPlayer/views/share/SharedVideoItemView' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Show = {

			'showVideo' : function ( videoId ) {

				App.content.show( new App.Common.LoadingView() );

				var getLicenses = App.request( 'user:licenses' );

				App.when( getLicenses ).then( function ( licenses ) {

					var licenseType = _.unique( licenses.pluck( 'LicenseContentTypeId' ) );

					return App.request( 'videoPlayer:getVideoContent', {
						'videoId'     : videoId ,
						'licenseType' : licenseType
					} );

				} ).then( function ( videoContent ) {

					if ( !videoContent ) {
						App.content.show( new App.Common.NotFoundView() );
					} else {
						this.showVideoResources( videoContent );
					}

				}.bind( this ) ).fail( App.errorHandler.bind( App, { 'region' : App.content } ) );

			},

			'showVideoResources' : function ( videoModel ) {

				var questionsRequest     = App.request( 'vq:fetch', videoModel.id );
				var relatedVideosRequest = App.request( 'videoPlayer:getRelatedVideos', videoModel.id );
				var queueContentsRequest = App.request( 'common:getQueueContents' );
				var segmentsRequest      = App.request( 'vq:segment', videoModel );

				App.when( questionsRequest, queueContentsRequest, segmentsRequest, relatedVideosRequest ).done( function ( questions, queueContents, segments, relatedVideos ) {

					var layout = new App.VideoPlayer.Views.PageLayout( {
						'model' : videoModel
					} );
					App.content.show( layout );

					//if there are other segments available
					if ( segments.models.length !== 0 ) {
						//get all segments Ids of other segments
						var segmentIds = _.pluck( _.pluck( segments.models, 'attributes') , 'ContentId');
						//find where is the id of next segment in segmentsIds
						var index = _.sortedIndex( segmentIds , videoModel.id );
						if ( index < segmentIds.length ) {
							//add the next segment to video model for overlay at the end of vid
							videoModel.nextSegment = segments.models[ index ];
						}
					}

					// set content queued attribute
					videoModel.setQueue( queueContents );

					// set video segments queued attribute
					segments.each( function ( model ) {
						model.setQueue( queueContents );
					} );

					// set related videos queued attribute
					relatedVideos.each( function ( model ) {
						model.setQueue( queueContents );
					} );

					// Videojs player view
					var videoPlayerView = new App.VideoPlayer.Views.VideoPlayerView( {
						'model' : videoModel
					} );
					layout.playerRegion.show( videoPlayerView );

					//Video info view
					var videoInfoView = new App.VideoPlayer.Views.VideoInfoView( {
						'model' : videoModel
					} );
					layout.videoInfoRegion.show( videoInfoView );

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

					// show video segments
					var segmentsView = new App.VideoPlayer.Views.VideoCollectionView( {
						'collection' : segments
					} );
					layout.videoSegmentsRegion.show( segmentsView );

					// show video resources
					var resources = App.request( 'videoPlayer:getVideoResources', videoModel );
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

				// show share video dialog
				var shareVideoLayout = new ShareVideoLayout( { 'model' : model } );
				App.modalRegion.show( shareVideoLayout, { 'className' : 'share-modal' } );

				// show shared video on the share dialog
				var sharedVideoView = new SharedVideoItemView( { 'model' : model } );
				shareVideoLayout.sharedVideoRegion.show( sharedVideoView );

			}

		};

	} );

} );
