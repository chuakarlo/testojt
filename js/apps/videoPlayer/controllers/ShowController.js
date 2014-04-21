// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );
	var _ = require( 'underscore' );

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	var ContentModel           = require( 'videoPlayer/models/ContentModel' );
	var QuestionsCollection    = require( 'videoPlayer/collections/QuestionsCollection' );
	var SegmentCollection      = require( 'videoPlayer/collections/VideoSegmentCollection' );
	var ResourcesCollection    = require( 'videoPlayer/collections/VideoResourcesCollection' );
	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Show = {

			'showVideo' : function( videoId ) {
				var licenseType = [ 0, 1, 200, 300 ];

				var videoContentRequests = {
					'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getContentByContentIdAndLicenseTypes',
					'args'   : {
						'contId'   : videoId,
						'licTypes' : licenseType
					}
				};

				var getVideoInfo = Remoting.fetch( videoContentRequests );

				$.when( getVideoInfo ).done( function ( response ) {
					this.showVideoResources( _.first( response ) );
				}.bind( this ) );
			},

			'showVideoResources' : function ( videoInfo ) {
				var licenseType = [ 0, 1, 200, 300 ];

				var videoModel = new ContentModel( videoInfo );

				var relatedVideosRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'relatedVideos',
					'args'   : {
						'ContentId' : videoModel.id
					}
				};

				var questionsRequest = {
					'path' : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getQuestionsWithAnswers',
					'args' : {
						'persId'    : Session.personnelId(),
						'ContentId' : videoModel.id
					}
				};

				var queueContentsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
					'method' : 'getContentAbbrevListByPersonnelId',
					'args'   : {
						'personnelId' : Session.personnelId()
					}
				};

				var resourcesRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getContentByContentIdAndLicenseTypes',
					'args'   : {
						'contId'   : videoModel.id,
						'licTypes' : licenseType
					}
				};


				// There are some responsed data that has no `Children` object
				// this will emit an error on invoking getProgramSegment in CF
				// so we have to check if `Children` is exist, if not will make one.
				if( !videoModel.get( 'Children' ) ){
					videoModel.set( 'Children', [ ] );
				}

				var segmentsRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.ContentService',
					'objectPath' : 'com.schoolimprovement.pd360.dao.core.Content',
					'method'     : 'getProgramFromSegment',
					'args'       : videoModel.toJSON()
				};

				var requests = [ questionsRequest, relatedVideosRequest, queueContentsRequest, segmentsRequest, resourcesRequest ];

				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( response ) {

					var layout = new App.VideoPlayer.Views.PageLayout( { 'model' : videoModel } );
					App.content.show( layout );

					var questions     = App.VideoPlayer.Controller.Filter.filterQuestions( response[ 0 ] );
					var relatedVideos = response[ 1 ].slice( 1 );
					var queueContents = response[ 2 ];
					var segments      = response[ 3 ];
					var resources     = response[ 4 ];

					// Videojs player view
					var videoPlayerView = new App.VideoPlayer.Views.VideoPlayerView( { 'model' : videoModel } );
					layout.playerRegion.show( videoPlayerView );

					// Questions view
					var questionsCollection = new QuestionsCollection( questions );
					var questionsView = new App.VideoPlayer.Views.QuestionsView( {
						'collection' : questionsCollection
					} );
					layout.questionsRegion.show( questionsView );

					// set video model queued flag
					videoModel.set( 'queued', _.contains( _.pluck( queueContents, 'ContentId' ), videoModel.id ) );

					// show video buttons view
					var videoButtonsView = new App.VideoPlayer.Views.VideoButtonsView( { 'model' : videoModel } );
					layout.videoButtonsRegion.show( videoButtonsView );

					// show video tabs view
					var videoTabsView = new App.VideoPlayer.Views.VideoTabsView();
					layout.videoTabsRegion.show( videoTabsView );

					// show video segments
					var segmentsCollection = new SegmentCollection( segments );
					var segmentsView = new App.VideoPlayer.Views.SegmentsView( {
						'collection' : segmentsCollection
					} );
					layout.videoSegmentsRegion.show( segmentsView );
					// show video resources
					var resourcesCollection = new ResourcesCollection();
					var resourcesView = new App.VideoPlayer.Views.ResourcesView( {
						'collection' : resourcesCollection.resetCollection( resources )
					} );
					layout.videoResourcesRegion.show( resourcesView );

					//show related vids
					var relatedView = new App.VideoPlayer.Views.RelatedVideoView( {
						'collection' : new RelatedVideoCollection( relatedVideos )
					} );
					layout.relatedVideosRegion.show( relatedView );
				} );

			},

			'showShareVideoDialog' : function ( model ) {
				var shareVideoLayout = new App.VideoPlayer.Views.ShareVideoLayout( {
					'model' : model
				} );

				// show share video dialog
				var modalView = new App.VideoPlayer.Views.ModalView();
				modalView.show( shareVideoLayout );
			}

		};

	} );

} );
