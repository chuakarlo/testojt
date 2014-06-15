define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var App   = require( 'App' );
	var Utils = App.Homepage.Utils;

	var homeListener = {
		queued        : 'queued',
		add           : 'add',
		remove        : 'remove',
		commonQueue   : 'common:queued',
		commonDequeue : 'common:dequeued'
	};

	function queue ( model, mode ) {
		var collection = Utils.activeCollections[ 'content:your-queue' ];
		model.set( homeListener.queued, mode === homeListener.add );
		collection[ mode ]( model );
		$( '#your-queue-count' ).text( collection.length );
	}

	function deQueue ( model ) {
		var collection = Utils.activeCollections[ 'content:recommended' ];
		var recommendedModel = collection.get( model.id );
		if ( recommendedModel ) {
			recommendedModel.set( homeListener.queued, false );
		}
	}

	App.vent.on( homeListener.commonQueue, function ( model ) {
		Utils.proceedHomeAction( function () {
			queue ( model, homeListener.add );
		} );
	} );

	App.vent.on( homeListener.commonDequeue, function ( model ) {
		Utils.proceedHomeAction( function () {
			queue( model, homeListener.remove );
			deQueue( model );
		} );
	} );

} );
