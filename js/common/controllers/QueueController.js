define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );

	App.module( 'Common', function ( Common ) {

		Common.QueueController = {

			'addToQueue' : function ( model ) {
				var addToQueueRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
					'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
					'method'     : 'create',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : model.id,
						'Created'     : ''
					}
				};

				var addToQueue = Remoting.fetch( addToQueueRequest );

				App.when( addToQueue ).done( function () {
					model.set( 'queued', true );
					App.vent.trigger( 'common:queued', model );
				} );

				// return promise so we can test execution of callbacks
				return addToQueue;
			},

			'removeFromQueue' : function ( model ) {
				var removeFromQueueRequest = {
					'path'       : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmarkGateway',
					'objectPath' : 'com.schoolimprovement.pd360.dao.core.ClientPersonnelBookmark',
					'method'     : 'deleteByObj',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : model.id,
						'Created'     : ''
					}
				};

				var removeFromQueue = Remoting.fetch( removeFromQueueRequest );

				App.when( removeFromQueue ).done( function () {
					model.set( 'queued', false );
					App.vent.trigger( 'common:dequeued', model );
				} );

				// return promise so we can test execution of callbacks
				return removeFromQueue;
			}
		};

		App.reqres.setHandler( 'common:addToQueue', function ( model ) {
			return Common.QueueController.addToQueue( model );
		} );

		App.reqres.setHandler( 'common:removeFromQueue', function ( model ) {
			return Common.QueueController.removeFromQueue( model );
		} );
	} );

} );
