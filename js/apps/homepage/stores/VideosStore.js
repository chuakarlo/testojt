define( function ( require ) {
	'use strict';

	var App            = require( 'App' );
	var ServerRequests = require( 'homepage/constants/ServerRequests' );

	App.module( 'Homepage.Stores', function ( Store ) {

		Store.VideosStore = {

			'getModelById' : function ( coll, id ) {
				var model;
				coll.each( function ( collModel, i ) {
					if ( collModel.id === id ) {
						model = collModel;
					}
				} );
				return model;
			},

			/**
			 * Removes a model in queue collection.
			 * @param  {Backbone.Model} model
			 */
			'removeVideoFromQueue' : function ( model ) {
				var m = this.getModelById( this.queuedVideos, model.id );
				this.queuedVideos.trigger( 'store:model:removed', m );
			},

			/**
			 * Triggers an event that will add the model into the queue carousel
			 * @param  {Backbone.Model} model
			 */
			'addVideoToQueue' : function ( model ) {
				// Custom event to inform carousel it needs to add items
				// We don't want to bind on "item:added" event in composite view
				// since it will cause the carousel to duplicate items.
				this.queuedVideos.trigger( 'store:model:added', model );
			},

			/**
			 * Updates queue status of a video in recommended videos carousel
			 * @param  {Backbone.Model} model
			 */
			'updateRecommendVideos' : function ( model ) {
				var m = this.recommendedVideos.findWhere( { 'ContentId' : model.get( 'ContentId' ) } );
				if ( m ) {
					m.set( 'queued', model.get( 'queued' ) );
				}
			}

		};

		App.vent.on( 'common:queued', function ( model ) {
			Store.VideosStore.addVideoToQueue( model );
			Store.VideosStore.updateRecommendVideos( model );
		} );

		App.vent.on( 'common:dequeued', function ( model ) {
			Store.VideosStore.removeVideoFromQueue( model );
			Store.VideosStore.updateRecommendVideos( model );
		} );

		App.vent.on( ServerRequests.RecommendedVideos, function ( collection ) {
			Store.VideosStore.recommendedVideos = collection;
		} );

		App.vent.on( ServerRequests.QueuedVideos, function ( collection ) {
			Store.VideosStore.queuedVideos = collection;
		} );

	} );

} );
