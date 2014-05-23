define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var $   = require( 'jquery' );

	var homeListener = {
		queued                   : 'queued',
		add                      : 'add',
		remove                   : 'remove',
		queueCollectionKey       : 'homepage:queueCollection',
		recommendedCollectionKey : 'homepage:recommendedCollection',
		queueTrigger             : 'homepage:your-queueRender',
		countCss                 : '#your-queue-count',
		commonQueue              : 'common:queued',
		commonDequeue            : 'common:dequeued',

		renderQueue              : function ( model, mode ) {
			if ( model.get( 'fromHomepage' ) ) {
				var queueCollection = App.reqres.request( this.queueCollectionKey );
				queueCollection[ mode ]( model );
				model.set( this.queued, mode === this.add );
				App.vent.trigger( this.queueTrigger );
				$( this.countCss ).text( queueCollection.length );
			}
		},

		renderRecommended        : function ( model ) {
			if ( model.get( 'fromHomepage' ) ) {
				var recommendedCollection = App.reqres.request( this.recommendedCollectionKey );
				var recommendedModel      = recommendedCollection.get( model.id );
				if ( recommendedModel ) {
					recommendedModel.set( this.queued, false );
				}
			}
		}
	};

	App.vent.on( homeListener.commonQueue, function ( model ) {
		homeListener.renderQueue( model, homeListener.add );
	} );

	App.vent.on( homeListener.commonDequeue, function ( model ) {
		homeListener.renderRecommended( model );
		homeListener.renderQueue( model, homeListener.remove );
	} );

} );
