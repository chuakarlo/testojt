define( function ( require ) {
	'use strict';

	var Spinner   = require( 'spin' );

	// view
	var LoadingView = require( 'videoPlayer/views/LoadingView' );
	var loadingView;

	describe( 'LoadingView', function () {

		before(function () {
			loadingView = new LoadingView();
		} );

		after( function () {
			loadingView = null;
		} );

		it( 'should have a `template` property', function () {
			loadingView.should.have.property( 'template' );
		} );

		it( 'should have a `className` property', function () {
			loadingView.should.have.property( 'className' );
		} );

		describe( 'LoadingView `initialize`', function () {

			it( 'should instantiate a `Spinner` object', function () {
				loadingView.spinner.should.be.an.instanceof( Spinner );
			} );

		} );

		describe( 'LoadingView `onShow`', function () {

			before( function () {
				loadingView.render().onShow();
			} );

			after( function () {
				loadingView.close();
			} );

			it( 'should show a spinner', function () {
				var $spinner = loadingView.$el.find( $ ( loadingView.spinner.el ) );
				$spinner.should.have.length( 1 );
			} );

		} );

		describe( 'LoadingView `onClose`', function () {

			before( function () {
				loadingView.render().onShow();
				loadingView.onClose();
			} );

			it( 'should close the spinner', function () {
				var $spinner = loadingView.$el.find( $ ( loadingView.spinner.el ) );
				$spinner.should.have.length( 0 );
			} );

		} );

	} );

} );
