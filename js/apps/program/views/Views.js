define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	App.module( 'Program.Views', function ( Views ) {

		Views.ProgramLayout   = require( '../views/ProgramLayout' );
		Views.ProgramDetails  = require( '../views/ProgramDetails' );
	} );

} );
