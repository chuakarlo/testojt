define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var _             = require( 'underscore' );
	var Vent          = require( 'Vent' );

	var templates = {
		'loggedIn'  : require( 'text!../templates/nav.html' ),
		'loggedOut' : require( 'text!../templates/navLoggedOut.html' )
	};

	return Marionette.Layout.extend( {

		'templates' : {
			'loggedIn'  : _.template( templates.loggedIn ),
			'loggedOut' : _.template( templates.loggedOut )
		},

		'tagName'   : 'nav',

		'ui' : {
			'resourcesTab'      : '#resources-tab',
			'resourcesDropdown' : '#resource-items',
			'menu'              : '.nav-menu',
			'drawer'            : '#menu'
		},

		'events' : {
			'mouseenter @ui.resourcesTab'      : 'showResourcesDropdown',
			'mouseleave @ui.resourcesDropdown' : 'hideResourcesDropdown',

			'mouseenter @ui.menu'              : 'showMenu',
			'mouseleave @ui.drawer'            : 'hideMenu',

			'submit form'                      : 'showSearchResults'
		},

		'initialize' : function ( options ) {

			_.bindAll( this );

			var self = this;

			this.authenticated = options.authenticated;

		},

		'getTemplate' : function ( options ) {
			if ( this.authenticated === true ) {
				return this.templates.loggedIn;
			} else {
				return this.templates.loggedOut;
			}
		},

		'showResourcesDropdown' : function ( event ) {
			this.ui.resourcesDropdown
				.show()
				.stop()
				.animate( {
					'height'  : 270,
					'opacity' : 1
				}, 500 );
		},

		'hideResourcesDropdown' : function ( event ) {
			this.ui.resourcesDropdown
				.stop()
				.animate( {
					'height'  : 0,
					'opacity' : 0
				}, 500, function () {
					this.hide();
				}.bind( this.ui.resourcesDropdown ) );
		},

		'showMenu' : function ( event ) {
			this.ui.drawer
				.show()
				.stop()
				.animate( { 'opacity' : 1 }, 500 );
		},

		'hideMenu' : function ( event ) {
			this.ui.drawer
				.stop()
				.animate( {
					'opacity' : 0
				}, 500, function () {
					this.hide();
				}.bind( this.ui.drawer ) );
		},

		'showSearchResults' : function ( event ) {
			event.preventDefault();
			Vent.trigger( 'search:showSearchResults' );

		}

	} );

} );