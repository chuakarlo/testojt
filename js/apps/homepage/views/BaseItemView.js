define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template = require( 'text!apps/homepage/templates/baseItemView.html' );

	return Marionette.Layout.extend( {

		'className'  : 'home-container',

		'template'   : _.template( template ),

		'regions' : {
			'messageRegion'           : '#home-page-message',
			'contentRegion'           : '#Home-page-view',
			'yourQueueHeader'         : '#queued-videos-header',
			'yourQueueRegion'         : '#queued-videos',
			'recommendedVideosHeader' : '#recommended-videos-header',
			'recommendedVideosRegion' : '#recommended-videos'
		}

	} );

} );
