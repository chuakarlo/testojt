define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	var App = require( 'App' );

	App.module( 'Entities', function ( Mod ) {
		Mod.GroupMemberModel = Backbone.Model.extend();
	} );

} );
