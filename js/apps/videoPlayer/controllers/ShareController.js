define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Share = {

			'shareVideo' : function ( shareTargets ) {
				var shareRequest = {
					'path'   : 'com.schoolimprovement.pd360.dao.RespondService',
					'method' : 'RespondSendMessage',
					'args'   : {
						'creator'      : Session.personnelId(),
						'message'      : shareTargets.message,
						'personnelIds' : shareTargets.personnels.join( ',' ),
						'licenseIds'   : shareTargets.groups.join( ',' )
					}
				};

				return Remoting.fetch( shareRequest );
			}

		};

	} );

} );
