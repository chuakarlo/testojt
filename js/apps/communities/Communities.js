define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	var CommunityView = require( 'communities/views/CommunitiesView' );

	App.module( 'Communities', function ( Mod ) {

		// configure communities routes
		Mod.Router = AuthRouter.extend( {

			'appRoutes' : {
				// Need to capture the Task URL first
				'resources/communities(/:ltid)(/:lid)(/:ftid)(/:fpid)/task/:tid' : 'showCommunities',
				'resources/communities(/:ltid)(/:lid)(/:ftid)(/:fpid)'           : 'showCommunities'
			}

		} );

		var Controller = Marionette.Controller.extend( {

			'showCommunities' : function() {
				// Args we potentially are going to pass to the flash. These
				// are in expected order of this function's arguments. If the
				// router doesn't get a match for the argument, it passes null
				var options = [
					'LocationTypeId',
					'LocationId',
					'ForumThreadId',
					'ForumPostId',
					'TaskId'
				];

				// The final args we are going to pass to the flash
				var requestArgs = { };

				// Iterates in order...
				_.each( arguments, function( arg ) {
					if( arg !== null ) {
						requestArgs[ options.shift() ] = arg;
					} else {
						options.shift();
					}
				} );

				// if the arguments are empty, just display the main community
				// page
				if ( _.isEmpty( requestArgs ) ) {
					App.request( 'pd360:navigate', CommunityView, 'communities',
						'communitiesBrowse' );
				} else {
					App.request( 'pd360:navigate', CommunityView, 'communities',
						'communitiesBrowse', requestArgs );

				}

			}

		} );

		Mod.showController = new Controller();

		App.addInitializer( function () {

			new Mod.Router( {
				'controller' : Mod.showController
			} );
		} );

	} );

} );
