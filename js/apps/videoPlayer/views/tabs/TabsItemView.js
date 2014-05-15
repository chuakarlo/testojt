define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/tabs/tabsItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'tagName'   : 'ul',

		'className' : 'nav nav-tabs tab-container',

		'ui' : {
			'videoResources' : 'a[href="#video-resources"]',
			'relatedVideos'  : 'a[href="#related-videos"]'
		},

		'events' : {
			'click @ui.videoResources' : 'showResources',
			'click @ui.relatedVideos'  : 'showRelated'
		},

		'showResources' : function ( e ) {
			e.preventDefault();

			this.ui.videoResources.tab( 'show' );

			this.$el.find( '.active' ).removeClass( 'active' );
			this.ui.videoResources.parent().addClass( 'active' );
		},

		'showRelated' : function ( e ) {
			e.preventDefault();

			this.ui.relatedVideos.tab( 'show' );

			this.$el.find( '.active' ).removeClass( 'active' );
			this.ui.relatedVideos.parent().addClass( 'active' );
		}

	} );

} );
