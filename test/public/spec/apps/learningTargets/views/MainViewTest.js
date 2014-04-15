define( function ( require ) {
	'use strict';

	var Marionette   = require( 'marionette' );
	var App          = require( 'App' );
	var sinon        = window.sinon;

	var MainView     = require( 'apps/learningTargets/views/MainView' );
	var mainView;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};
	var dummyCnt = 'courses';

	var initView = function () {
		mainView = new MainView();
	};

	var destroyView = function () {
		mainView = undefined;
	};

	describe( 'Learning Targets `MainView`', function () {
		before( function() {
			initView();
		} );

		after( function() {
			destroyView();
		} );

		it( 'does have `template` property', function () {
			mainView.should.have.property( 'template' );
		} );

		it( 'does have `className` property and have correct values', function () {
			mainView.should.have.property( 'className' );
			mainView.className.should.be.equal( 'learning-targets' );
		} );

		it( 'does have `ui` property', function () {
			mainView.should.have.property( 'ui' );
		} );

		it( 'does have `events` property', function () {
			mainView.should.have.property( 'events' );
		} );
		describe( '.hideTrackSection', function () {
			describe( 'when `close` button or `X` in the upper right corner is clicked', function () {
				var hideTrackSectionSpy;

				before( function () {
					hideTrackSectionSpy = sinon.spy( mainView, 'hideTrackSection' );
					mainView.hideTrackSection( dummyEvt );
				} );

				after( function () {
					mainView.hideTrackSection.restore();
				} );

				it( 'does call `.hideTrackSection`', function () {
					hideTrackSectionSpy.should.have.been.calledOnce;
				} );
			} );
		} );
		describe( '.activateTab', function () {
			describe( 'when select a Tab', function () {
				var activateTabSpy;

				before( function () {
					activateTabSpy = sinon.spy( mainView, 'activateTab' );
					mainView.activateTab( dummyCnt );
				} );

				after( function () {
					mainView.activateTab.restore();
				} );

				it( 'does call `.activateTab`', function () {
					activateTabSpy.should.have.been.calledOnce;
				} );
			} );
		} );
	} );
} );