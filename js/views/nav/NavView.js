define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!templates/nav/nav.html' );

	return Marionette.ItemView.extend( {
		'template'  : _.template( template ),
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
			'mouseleave @ui.drawer'            : 'hideMenu'
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

	} );

} );