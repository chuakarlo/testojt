define( function ( require ) {
	'use strict';

	var $   = require( 'jquery' );
	var _   = require( 'underscore' );
	var App = require( 'App' );

	var emptyQueueTemplate = require( 'text!apps/homepage/external/content3/external/queue/templates/emptyQueueTemplate.html' );

	function setOwnership ( name ) {
		return name.toLowerCase().charAt( name.length - 1 ) !== 's' ? 's' : '';
	}

	return {
		'id'           : 'your-queue',
		'header'       : function () {
			var firstName = App.request( 'homepage:userProfile' ).FirstName;
			return firstName + '\'' + setOwnership( firstName ) + ' Queue';
		},
		'contentDesc'  : 'Your queue displays content that you select to watch later. When you find content that you want to add to your queue, click Add to Queue.',
		'collection'   : require( 'apps/homepage/external/content3/external/queue/collections/QueueCollection' ),
		'updateCount'  : function ( collection ) {
			$( this.id + '-count' ).text( collection.length );
		},
		'modelLogic'   : function ( model) {
			model.set( 'queued', true );
		},
		'EmptyMessage' : {
			'heading' : 'You currently do not have any videos in your queue.',
			'details' : _.template( emptyQueueTemplate )
		},
		'modelSet'     : function ( model ) {
			model.set( 'queued', true );
		}
	};
} );
