define( function ( require ) {
	'use strict';

	var App = require( 'App' );

	var LoadingView         = require( './LoadingView' );
	var NotFoundView        = require( './NotFoundView' );
	var ErrorView           = require( './ErrorView' );
	var SegmentCardsView    = require( './SegmentCardsView' );
	var NewSegmentCardsView = require( './SegmentCard/SegmentCardsView' );

	App.module( 'Common', function ( Common ) {
		Common.LoadingView         = LoadingView;
		Common.NotFoundView        = NotFoundView;
		Common.ErrorView           = ErrorView;
		Common.SegmentCardsView    = SegmentCardsView;
		Common.NewSegmentCardsView = NewSegmentCardsView;
	} );

} );
