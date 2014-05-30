define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var template   = require( 'text!observation/templates/observation.html' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'id' : 'header',

		'ui' : {
			'processTab' : '#process-me',
			'obsTab'     : '#observe-me'
		},

		'initialize' : function () {
			this.listenTo( Backbone.history, 'route', _.bind( function () {
				var query = this.getCurrentQuery();
				this.setActiveTab( query );
			}, this ) );
		},

		'getCurrentQuery' : function () {
			var current = App.getCurrentRoute();
			var split = current.split( '/' );
			split.pop();
			return split.pop();
		},

		'setActiveTab' : function ( query ) {

			$('li', this.el).removeClass( 'active' );
			switch ( query ) {

				case 'observation' :
					this.ui.obsTab.addClass( 'active' );
					break;

				case 'processes' :
					this.ui.processTab.addClass( 'active' );
					break;
			}
		},

		'onShow' : function () {
			var query = this.getCurrentQuery();
			this.setActiveTab( query );
		}

	} );

} );
