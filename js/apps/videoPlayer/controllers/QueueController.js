define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	App.module( 'VideoPlayer.Controller', function ( Controller ) {

		Controller.Queue = {

			'addContent' : function ( model ) {
				var addToQueueRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
					'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
					'method'     : 'create',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : model.id,
						'Created'     : model.get( 'Created' )
					}
				};

				var addToQueue = Remoting.fetch( addToQueueRequest );

				$.when( addToQueue ).done( function () {
					model.set( 'queued', true );
					App.vent.trigger( 'flash:message', { 'type' : 'success', 'message' : 'Added to Watch Later' } );
				} );

				// return promise so we can test execution of callbacks
				return addToQueue;
			},

			'removeContent' : function ( model ) {
				var removeFromQueueRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
					'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
					'method'     : 'deleteByObj',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : model.id,
						'Created'     : model.get( 'Created' )
					}
				};

				var removeFromQueue = Remoting.fetch( removeFromQueueRequest );

				$.when( removeFromQueue ).done( function () {
					model.set( 'queued', false );
					App.vent.trigger( 'flash:message', { 'type' : 'success', 'message' : 'Removed from Watch Later' } );
				} );

				// return promise so we can test execution of callbacks
				return removeFromQueue;
			}

		};

	} );

} );
