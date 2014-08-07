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
			'sort'           : '.cn-sort-item',
			'disabledFilter' : '.cn-disabled'
		},

		'events' : {
			'click @ui.sort'           : 'updateSort',
			'click @ui.disabledFilter' : 'ignoreClick'
		},

		'updateSort' : function () {

			var sort              = this.model.attributes.value;
			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );

			if ( hasPendingRequest || this.$el.hasClass( 'selected' ) || this.$el.has( '.cn-disabled' ).length ) {
				return;
			}

			this.$el.parent().children( 'li' ).removeClass( 'selected' );
			this.$el.addClass( 'selected' );

			Vent.trigger( 'contentNavigation:resetBodyScroll' );

			Vent.trigger( 'contentNavigation:changeSort', sort );
		},

		'ignoreClick' : function ( e ) {
			e.preventDefault();
			return;
		}

	} );

} );
