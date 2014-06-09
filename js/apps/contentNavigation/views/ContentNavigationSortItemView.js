define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	var template   = require( 'text!../templates/contentNavigationSortItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'ui' : {
			'sort' : '.cn-sort-item'
		},

		'events' : {
			'click @ui.sort' : 'updateSort'
		},

		'updateSort' : function () {

			var sort              = this.model.attributes.value;
			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );

			if ( hasPendingRequest ) {
				return;
			}

			this.$el.parent().children( 'li' ).removeClass( 'selected' );
			this.$el.addClass( 'selected' );

			Vent.trigger( 'contentNavigation:resetBodyScroll');

			Vent.trigger( 'contentNavigation:changeSort', sort );
		}

	} );

} );
