define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	// ## Communities App
	App.module( 'Communities', function ( Communities ) {

		// load communities show module
		require( './controllers/showController' );

		// configure communities routes
		Communities.Router = AuthRouter.extend( {

			'appRoutes' : {
				'resources/communities' : 'showCommunities',
				'resources/communities/:ltid/:lid' : 'showForumGroup',
				'resources/communities/:ltid/:lid/:ftid' : 'showFormThread',
				'resources/communities/:ltid/:lid/:ftid/:fpid' : 'showFormPost'
			}

		} );

		var API = {
			'showCommunities' : function ( error, results, args ) {
				// TODO: error handling
				if ( !error ) {
					Communities.Show.Controller.showCommunities();
				}
			},

			'showForumGroup' : function( LocationTypeId, LocationId ) {
				Communities.Show.Controller.showGroupForums( LocationTypeId, LocationId );
			},

			'showFormThread' : function( LocationTypeId, LocationId, ForumThreadId ) {
				Communities.Show.Controller.showCommunities();
				App.request( 'pd360:navigate', null, 'communities', 'communitiesBrowse', {
					'LocationTypeId' : LocationTypeId,
					'LocationId'     : LocationId,
					'ForumThreadId'  : ForumThreadId
				} );
			},

			'showFormPost' : function( LocationTypeId, LocationId, ForumThreadId, ForumPostId ) {
				Communities.Show.Controller.showCommunities();
				App.request( 'pd360:navigate', null, 'communities', 'communitiesBrowse', {
					'LocationTypeId' : LocationTypeId,
					'LocationId'     : LocationId,
					'ForumThreadId'  : ForumThreadId,
					'ForumPostId'    : ForumPostId
				} );
			}
		};

		App.addInitializer( function () {
			new Communities.Router( {
				'controller' : API
			} );
		} );

	} );

} );
