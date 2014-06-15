define( function ( require ) {
	'use strict';

	var $   = require( 'jquery' );
	var App = require( 'App' );

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
		'collection'   : require( 'apps/homepage/external/content2/external/queue/collections/QueueCollection' ),
		'updateCount'  : function ( collection ) {
			$( this.id + '-count' ).text( collection.length );
		},
		'modelLogic'   : function ( model) {
			model.set( 'queued', true );
		},
		'EmptyMessage' : {
			'heading' : 'No video added to your queue.',
			'details' : 'Select any content by clicking watch later icon to add.'
		}
	};
} );
