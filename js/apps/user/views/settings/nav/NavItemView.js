define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var template   = require( 'text!user/templates/settings/nav/NavItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'events' : {
			'click a' : 'navigate'
		},

		'initialize' : function () {
			this.listenTo( this.model, 'change:active', this.checkActive );
		},

		'onRender' : function () {
			this.checkActive();
		},

		'navigate' : function ( event ) {
			event.preventDefault();
			event.stopPropagation();

			var filter = this.model.get( 'filter' );

			App.navigate( 'settings/' + filter, { 'trigger' : true } );
		},

		'checkActive' : function () {

			if ( this.model.get( 'active' ) ) {
				this.$el.addClass( 'active' );
			} else {
				this.$el.removeClass( 'active' );
			}

		}

	} );

} );