define( function ( require ) {
	'use strict';

	var LoadingView = require( './LoadingView' );
	var App         = require( 'App' );

	App.module( 'Common', function ( Common, App ) {

		Common.LoadingView = LoadingView;

	} );

} );
