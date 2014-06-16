define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	var template   = require( 'text!../templates/contentNavigationUUVCategoryItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'ui' : {
			'category' : '.cn-uuv-category-item'
		},

		'events' : {
			'click @ui.category' : 'changeCategory'
		},

		'changeCategory' : function () {

			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );

			if ( hasPendingRequest || this.$el.hasClass( 'selected' ) ) {
				return;
			}

			this.$el.parent().children( 'li' ).removeClass( 'selected' );
			this.$el.addClass( 'selected' );

			Vent.trigger( 'contentNavigation:resetBodyScroll' );

			Vent.trigger( 'contentNavigation:uuv:changeCategory', this.model );
		}

	} );

} );
