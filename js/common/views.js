define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var LoadingView      = require( './views/LoadingView' );
	var NotFoundView     = require( './views/NotFoundView' );
	var ErrorView        = require( './views/ErrorView' );
	var SegmentCardsView = require( './views/SegmentCardsView' );

	App.module( 'Common', function ( Common ) {
		Common.LoadingView      = LoadingView;
		Common.NotFoundView     = NotFoundView;
		Common.ErrorView        = ErrorView;
		Common.SegmentCardsView = SegmentCardsView;
	} );

} );
