define( function( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!../templates/SearchNavItemView.html' );

	return Marionette.ItemView.extend( {
		
		'tagName'   : 'li',
		'template'  : _.template( template ),

		'ui' : {
			'badge' : '.badge',
			'link'  : 'a'
		},

		'events' : {
			'click a' : 'navigate'
		},

		'initialize' : function() {
			this.listenTo( this.model, 'change:active', this.checkActive);
			this.listenTo( this.model, 'change:results', this.render);
		},

		onRender : function() {
			this.checkActive();
		},

		'navigate' : function( event ) {
			// This doesn't belong here
			event.preventDefault();
			var current = App.getCurrentRoute();
			// get the query
			var query = _.last( current.split( '/' ) );
			// build the URL
			var url = this.ui.link.attr('href') + query;

			App.navigate( url, {
				'trigger' : true
			} );
		},

		'checkActive' :  function( ) {
			if ( this.model.get( 'active' ) ) {
				this.$el.addClass('active');
				this.ui.badge.show();
			} else {
				this.$el.removeClass('active');
				this.ui.badge.hide();
			}
		},

		'templateHelpers' : function() {
			return {
				'BadgeCount' : function() {
					if ( this.results === 0 ) {
						return '';
					}
					return this.results;
				}
			};
		}

	} );
} );