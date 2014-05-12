define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var App      = require( 'App' );
	var Remoting = require( 'Remoting' );

	var ContentModel           = require( 'videoPlayer/models/ContentModel' );
	var QuestionsCollection    = require( 'videoPlayer/collections/QuestionsCollection' );
	var ResourcesCollection    = require( 'videoPlayer/collections/VideoResourcesCollection' );
	var RelatedVideoCollection = require( 'videoPlayer/collections/RelatedVideoCollection' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Show = {

			'showVideo' : function ( videoId ) {

				App.content.show( new App.Common.LoadingView() );

				var getLicenses = App.request( 'user:licenses' );

				App.when( getLicenses ).then( function ( licenses ) {
					var licenseType =  _.unique( licenses.pluck( 'LicenseContentTypeId' ) );

					var videoContentRequests = {
						'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
						'method' : 'getContentByContentIdAndLicenseTypes',
						'args'   : {
							'contId'   : videoId,
							'licTypes' : licenseType
						}
					};

					return Remoting.fetch( videoContentRequests );

				} ).then( function ( videoContent ) {
					if ( _.isEmpty( videoContent ) || _.first( videoContent ) === '' ) {
						App.content.show( new App.Common.NotFoundView() );
					} else {
						this.showVideoResources( _.first( videoContent ) );
					}
				}.bind( this ) ).fail( function () {
					App.content.show( new App.Common.ErrorView( {
						'message' : 'There was an error loading the page.',
						'flash'   : 'An error occurred. Please try again later.'
					} ) );
				} );

			},

			'showVideoResources' : function ( videoInfo ) {

				var videoModel = new ContentModel( videoInfo );

				var relatedVideosRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'relatedVideos',
					'args'   : {
						'ContentId' : videoModel.id
					}
				};

				var segmentsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getProgramFromSegment',
					'args'   : {
						'ContentId'       : videoModel.get( 'ContentId' ),
						'ContentParentId' : videoModel.get( 'ContentParentId' ),
						'ContentTypeId'   : videoModel.get( 'ContentTypeId' )
					}
				};

				var questionsRequest     = App.request( 'vq:fetch', videoModel.id );
				var queueContentsRequest = App.request( 'common:getQueueContents' );

				var requests = [ relatedVideosRequest, segmentsRequest ];
				var videoEntities = Remoting.fetch( requests );

				App.when( questionsRequest, queueContentsRequest, videoEntities ).done( function ( questions, queueContents, entities ) {

					var layout = new App.VideoPlayer.Views.PageLayout( { 'model' : videoModel } );
					App.content.show( layout );

					var relatedVideos = entities[ 0 ].slice( 1 );
					var segments      = entities[ 1 ];

					// Videojs player view
					var videoPlayerView = new App.VideoPlayer.Views.VideoPlayerView( { 'model' : videoModel } );
					layout.playerRegion.show( videoPlayerView );

					//Video info view
					var videoInfoView = new App.VideoPlayer.Views.VideoInfoView( { 'model' : videoModel } );
					layout.videoInfoRegion.show( videoInfoView );

					// Questions view
					var questionsCollection = new QuestionsCollection( questions );
					// Set question ContentTypeId based on video ContentTypeId.
					// This is used to when saving the set of questions.
					questionsCollection.map( function ( question ) {
						question.set( 'ContentTypeId', videoModel.get( 'ContentTypeId' ) );
					} );

					var questionsView = new App.VideoPlayer.Views.QuestionsView( {
						'collection' : questionsCollection
					} );
					layout.questionsRegion.show( questionsView );

					// set video model queued flag
					videoModel.set( 'queued', _.contains( queueContents.pluck( 'ContentId' ), videoModel.id ) );

					// show video buttons view
					var videoButtonsView = new App.VideoPlayer.Views.VideoButtonsView( { 'model' : videoModel } );
					layout.videoButtonsRegion.show( videoButtonsView );

					// show video segments
					var segmentsView = new App.VideoPlayer.Views.VideoCollectionView( {
						'collection' : new RelatedVideoCollection( segments )
					} );
					layout.videoSegmentsRegion.show( segmentsView );

					// show video resources
					var resourcesCollection = new ResourcesCollection();
					var resourcesView = new App.VideoPlayer.Views.ResourcesView( {
						'collection' : resourcesCollection.resetCollection( videoModel.toJSON() )
					} );
					layout.videoResourcesRegion.show( resourcesView );

					//show related vids
					var relatedView = new App.VideoPlayer.Views.VideoCollectionView( {
						'collection' : new RelatedVideoCollection( relatedVideos )
					} );
					layout.relatedVideosRegion.show( relatedView );

					// show video tabs view
					var videoTabsView = new App.VideoPlayer.Views.VideoTabsView();
					layout.videoTabsRegion.show( videoTabsView );

				} ).fail( function ( error ) {
					App.content.show( new App.Common.ErrorView( {
						'message' : 'There was an error loading the page.',
						'flash'   : 'An error occurred. Please try again later.'
					} ) );
				} );

			},

			'showShareVideoDialog' : function ( model ) {
				// show share video dialog
				var shareVideoLayout = new App.VideoPlayer.Views.ShareVideoLayout( { 'model' : model } );
				App.modalRegion.show( shareVideoLayout, { 'className' : 'share-modal' } );

				// show shared video on the share dialog
				var sharedVideoView = new App.VideoPlayer.Views.SharedVideoView( { 'model' : model } );
				shareVideoLayout.sharedVideoRegion.show( sharedVideoView );
			}

		};

	} );

} );
