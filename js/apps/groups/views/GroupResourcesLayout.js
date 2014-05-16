define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!../templates/groupResourcesLayout.html' );

	App.module( 'Groups.Views', function ( Mod ) {

		Mod.GroupResourcesLayout = Marionette.Layout.extend( {

			'template'  : _.template( template ),

			'regions' : {
				'leaderRegion' : '.resources-leader-list',
				'memberRegion' : '.resources-member-list'
			}

		} );
	} );

} );
