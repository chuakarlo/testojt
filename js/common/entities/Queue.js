define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var Session  = require( 'Session' );

	App.module( 'Entities', function ( Entities ) {

		Entities.QueueContent = Backbone.CFModel.extend( {

			'initialize' : function () {
				var modelId;
				var videoTypeId;

				if ( !_.isUndefined( this.get( 'ContentId' ) ) ) {
					modelId     = this.get( 'ContentId' );
					videoTypeId = 1;
				} else {
					modelId     = this.get( 'UUVideoId' );
					videoTypeId = 2;
				}

				// set model id and VideoTypeId
				this.id = modelId;
				this.set( 'VideoTypeId', videoTypeId );
			}

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
			},

			'isQueued' : function ( content ) {
				var result = false;

				this.models.forEach( function ( model ) {
					if ( !result ) {
						result = ( model.id === content.id );
					}
				} );

				return result;
			}

		} );

		Entities.QueueAddContent = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelBookmarkGateway',

			'initialize' : function ( attr, options ) {
				this.content = options.content;
			},

			'getCreateOptions' : function () {
				var id;
				if ( _.isFunction( this.content.getId ) ) {
					id = this.content.getId();
				} else {
					id = this.content.id;
				}

				return {
					'objectPath' : 'core.ClientPersonnelBookmark',
					'method'     : 'create',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : id,
						'VideoTypeId' : this.content.get( 'VideoTypeId' ),
						'Created'     : ''
					}
				};
			}

		} );

		Entities.QueueRemoveContent = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelBookmarkGateway',

			'initialize' : function ( attr, options ) {
				this.content = options.content;
			},

			'getCreateOptions' : function () {
				var id;
				if ( _.isFunction( this.content.getId ) ) {
					id = this.content.getId();
				} else {
					id = this.content.id;
				}
				return {
					'objectPath' : 'core.ClientPersonnelBookmark',
					'method'     : 'deleteByObj',
					'args'       : {
						'PersonnelId' : Session.personnelId(),
						'ContentId'   : id,
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

			'addContent' : function ( options ) {
				var defer   = App.Deferred();
				var content = new Entities.QueueAddContent( { }, options );

				content.save( null, {

					'success' : function ( model ) {
						defer.resolve( model );
					},

					'error' : function ( e ) {
						return defer.reject( new Error( 'An error occurred while trying to add video to Watch Later. Please try again later.' ) );
					}

				} );

				return defer.promise();
			},

			'removeContent' : function ( options ) {
				var defer   = App.Deferred();
				var content = new Entities.QueueRemoveContent( { }, options );

				content.save( null, {

					'success' : function ( model ) {
						defer.resolve( model );
					},

					'error' : function () {
						return defer.reject( new Error( 'An error occurred while trying to remove video from Watch Later. Please try again later.' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'common:getQueueContents', function () {
			return API.getContents();
		} );

		App.reqres.setHandler( 'common:addToQueue', function ( model ) {

			var addToQueue = API.addContent( { 'content' : model } );

			App.when( addToQueue ).done( function () {

				model.set( 'queued', true );
				App.vent.trigger( 'common:queued', model );
				App.vent.trigger( 'flash:message', {
					'type'    : 'success',
					'message' : 'Added to Queue'
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'common:queueFailed' );

				return App.errorHandler( new Error( error.message ) );

			} );

			return addToQueue;

		} );

		App.reqres.setHandler( 'common:removeFromQueue', function ( model ) {

			var removeFromQueue = API.removeContent( { 'content' : model } );

			App.when( removeFromQueue ).done( function () {

				model.set( 'queued', false );
				App.vent.trigger( 'common:dequeued', model );
				App.vent.trigger( 'flash:message', {
					'type'    : 'success',
					'message' : 'Removed from Queue'
				} );

			} ).fail( function ( error ) {

				App.vent.trigger( 'common:queueFailed' );

				return App.errorHandler( new Error( error.message ) );

			} );

			return removeFromQueue;

		} );

	} );

} );
