define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var $   = require( 'jquery' );

	App.vent.on( 'common:queued', function ( model ) {
		//click Recommended Queue Watch Later
		var queueCollection = App.reqres.request( 'homepage:queueCollection' );

		model.set( 'queued', true );
		queueCollection.add( model );

		App.vent.trigger( 'homepage:your-queueRender' );

		$( '#your-queue-count' ).text( queueCollection.length );
	} );

	App.vent.on( 'common:queueFailed', function ( model ) {
	} );

	App.vent.on( 'common:dequeued', function ( model ) {
		//click Queue - Watch Later List

		var recommendedCollection = App.reqres.request( 'homepage:recommendedCollection' );
		var queueCollection       = App.reqres.request( 'homepage:queueCollection' );
		var recommendedModel      = recommendedCollection.get( model.id );

		model.set( 'queued', false );
		if ( recommendedModel ) {
			recommendedModel.set( 'queued', false );
		}

		queueCollection.remove( model.id );

		App.vent.trigger( 'homepage:your-queueRender' );
	} );

	App.vent.on( 'common:dequeueFailed', function ( model ) {
	} );

} );
