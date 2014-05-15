define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	App.module( 'Entities', function ( Entities ) {

		Entities.QueueContent = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId'

		} );

		Entities.QueueContents = Backbone.CFCollection.extend( {

			'path'  : 'core.ClientPersonnelBookmarkGateway',
			'model' : Entities.QueueContent,

			'getReadOptions' : function () {
				return {
					'method' : 'getContentAbbrevListByPersonnelId',
					'args'   : {
						'personnelId' : Session.personnelId()
					}
				};
			}

		} );

		Entities.QueueAddContent = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelBookmarkGateway',

			'initialize' : function ( options ) {
				_.bindAll( this );
				_.extend( this, options );

				return this;
			},

			'getCreateOptions' : function () {
				return {
					'objectPath' : 'core.ClientPersonnelBookmark',
					'method'     : 'create',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : this.content.id,
						'VideoTypeId' : this.content.get( 'VideoTypeId' ),
						'Created'     : ''
					}
				};
			}

		} );

		Entities.QueueRemoveContent = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelBookmarkGateway',

			'initialize' : function ( options ) {
				_.bindAll( this );
				_.extend( this, options );

				return this;
			},

			'getCreateOptions' : function () {
				return {
					'objectPath' : 'core.ClientPersonnelBookmark',
					'method'     : 'deleteByObj',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : this.content.id,
						'VideoTypeId' : this.content.get( 'VideoTypeId' ),
						'Created'     : ''
					}
				};
			}

		} );

		var API = {
			'getContents' : function () {
				var defer    = App.Deferred();
				var contents = new Entities.QueueContents();

				contents.fetch( {

					'success' : function () {
						defer.resolve( contents );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching queue contents' ) );
					}

				} );

				return defer.promise();
			},

			'addContent' : function ( model ) {
				var defer   = App.Deferred();
				var content = new Entities.QueueAddContent( { 'content' : model } );

				content.save( null, {

					'success' : function ( model ) {
						defer.resolve( model );
					},

					'error' : function () {
						defer.reject( new Error( 'Error adding queue content' ) );
					}

				} );

				return defer.promise();
			},

			'removeContent' : function ( model ) {
				var defer   = App.Deferred();
				var content = new Entities.QueueRemoveContent( { 'content' : model } );

				content.save( null, {

					'success' : function ( model ) {
						defer.resolve( model );
					},

					'error' : function () {
						defer.reject( new Error( 'Error removing queue content' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'common:getQueueContents', function () {
			return API.getContents();
		} );

		App.reqres.setHandler( 'common:addToQueue', function ( model ) {

			var addToQueue = API.addContent( model );

			App.when( addToQueue ).done( function () {

				model.set( 'queued', true );
				App.vent.trigger( 'common:queued', model );
				App.vent.trigger( 'flash:message', {
					'type'    : 'success',
					'message' : 'Added to Watch Later'
				} );

			} ).fail( function () {

				App.vent.trigger( 'common:queueFailed' );
				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred while trying to add video to Watch Later. Please try again later.'
				} );

			} );

			return addToQueue;

		} );

		App.reqres.setHandler( 'common:removeFromQueue', function ( model ) {

			var removeFromQueue = API.removeContent( model );

			App.when( removeFromQueue ).done( function () {

				model.set( 'queued', false );
				App.vent.trigger( 'common:dequeued', model );
				App.vent.trigger( 'flash:message', {
					'type'    : 'success',
					'message' : 'Removed from Watch Later'
				} );

			} ).fail( function () {

				App.vent.trigger( 'common:queueFailed' );
				App.vent.trigger( 'flash:message', {
					'message' : 'An error occurred while trying to remove video from Watch Later. Please try again later.'
				} );

			} );

			return removeFromQueue;

		} );

	} );

} );
