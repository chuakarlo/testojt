define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	var template   = require( 'text!../templates/contentNavigationLibraryItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'ui' : {
			'item' : '.cn-library-item'
		},

		'events' : {
			'click @ui.item' : 'switchLibrary'
		},

		'switchLibrary' : function () {

			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );

			if ( hasPendingRequest || this.$el.hasClass( 'selected' ) ) {
				return;
			}

			this.$el.parent().children( 'li' ).removeClass( 'selected' );
			this.$el.addClass( 'selected' );

			Vent.trigger( 'contentNavigation:resetBodyScroll');

			if ( this.model.get( 'LibraryType' ) === 'pd360' ) {
				Vent.trigger( 'contentNavigation:switchLibrary', this.model, true );
			} else {
				Vent.trigger( 'contentNavigation:switchLibrary', this.model );
			}
		}

	} );

} );
