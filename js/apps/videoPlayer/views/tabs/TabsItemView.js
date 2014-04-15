define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!videoPlayer/templates/tabs/tabsItemView.html' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'tagName'   : 'ul',
		'className' : 'nav nav-tabs',

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
			this._toggleActiveTab( e.target );
		},

		'showRelated' : function ( e ) {
			e.preventDefault();

			this.ui.relatedVideos.tab( 'show' );
			this._toggleActiveTab( e.target );
		},

		// toggle active tab
		'_toggleActiveTab' : function ( target ) {
			// remove class from all
			this.$el.children( 'li' ).removeClass( 'active' );

			// add class to the clicked element
			$( target ).parent().addClass( 'active' );
		}

	} );

} );
