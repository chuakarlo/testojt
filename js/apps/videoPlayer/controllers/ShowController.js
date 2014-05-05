define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );
	var _ = require( 'underscore' );

	var App      = require( 'App' );
	var Session  = require( 'Session' );
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

				$.when( getLicenses ).then( function ( licenses ) {
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
				}.bind( this ) );

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

				var questionsRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.ContentService',
					'method' : 'getQuestionsWithAnswers',
					'args'   : {
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

				// There are some responsed data that has no `Children` object
				// this will emit an error on invoking getProgramSegment in CF
				// so we have to check if `Children` is exist, if not will make one.
				if ( !videoModel.get( 'Children' ) ) {
					videoModel.set( 'Children', [ ] );
				}

				var segmentsRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.ContentService',
					'objectPath' : 'com.schoolimprovement.pd360.dao.core.Content',
					'method'     : 'getProgramFromSegment',
					'args'       : videoModel.toJSON()
				};

				var requests = [ questionsRequest, relatedVideosRequest, queueContentsRequest, segmentsRequest ];

				var fetchingData = Remoting.fetch( requests );

				$.when( fetchingData ).done( function ( response ) {

					var layout = new App.VideoPlayer.Views.PageLayout( { 'model' : videoModel } );
					App.content.show( layout );

					var questions     = response[ 0 ];
					var relatedVideos = response[ 1 ].slice( 1 );
					var queueContents = response[ 2 ];
					var segments      = response[ 3 ];

					// Videojs player view
					var videoPlayerView = new App.VideoPlayer.Views.VideoPlayerView( { 'model' : videoModel } );
					layout.playerRegion.show( videoPlayerView );

					//Video info view
					var videoInfoView = new App.VideoPlayer.Views.VideoInfoView( { 'model' : videoModel } );
					layout.videoInfoRegion.show( videoInfoView );

					// Questions view
					// Determine what type of questions to show ( reflection/followup )
					questions = App.VideoPlayer.Controller.Filter.setQuestions( questions );
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
					videoModel.set( 'queued', _.contains( _.pluck( queueContents, 'ContentId' ), videoModel.id ) );

					// show video buttons view
					var videoButtonsView = new App.VideoPlayer.Views.VideoButtonsView( { 'model' : videoModel } );
					layout.videoButtonsRegion.show( videoButtonsView );

					// show video tabs view
					var videoTabsView = new App.VideoPlayer.Views.VideoTabsView();
					layout.videoTabsRegion.show( videoTabsView );

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
				} );

			},

			'showShareVideoDialog' : function ( model ) {
				var shareVideoLayout = new App.VideoPlayer.Views.ShareVideoLayout( {
					'model' : model
				} );

				// show share video dialog
				App.modalRegion.show( shareVideoLayout, { 'className' : 'share-modal' } );
			}

		};

	} );

} );
