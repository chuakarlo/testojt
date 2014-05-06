define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	var LearningProgressionLayout = require( 'learningProgression/views/LearningProgressionLayout' );

	require( 'learningProgression/LearningProgression' );

	describe( 'Learning Progression Module', function () {

		after( function () {
			App.module( 'LearningProgression' ).stop();
		} );

		it( 'should create module `LearningProgression`', function () {
			App.should.have.property( 'LearningProgression' );
			App.LearningProgression.should.be.an.instanceof( Marionette.Module );
			App.LearningProgression.should.have.property( 'Show' );
		} );

		describe( 'Show controller', function () {

			it( 'should create submodule Show', function () {
				App.LearningProgression.should.have.property( 'Show' );
				App.LearningProgression.Show.should.be.an.instanceof( Marionette.Module );
				App.LearningProgression.Show.should.have.property( 'BaseController' );
				App.LearningProgression.Show.should.have.property( 'ContentController' );
			} );

			describe( 'showLearningProgression', function () {

				var loadedSpy, navigateSpy;

				before( function () {
					loadedSpy   = sinon.spy();
					navigateSpy = sinon.spy();

					App.reqres.setHandler( 'pd360:loaded', loadedSpy );
					App.reqres.setHandler( 'pd360:navigate', navigateSpy );

					var Content = new App.LearningProgression.Show.ContentController( {
						'layout' : new LearningProgressionLayout()
					} );

					Content.should.have.property( 'showLearningProgession' );
					Content.showLearningProgession();
				} );

				after( function () {
					App.reqres.removeHandler( 'pd360:loaded' );
					App.reqres.removeHandler( 'pd360:navigate' );
				} );

				it( 'should call pd360:loaded', function () {
					loadedSpy.should.have.callCount( 1 );
					loadedSpy.should.have.been.calledBefore( navigateSpy );
				} );

				it( 'should call pd360:navigate', function () {
					navigateSpy.should.have.callCount( 1 );
				} );

			} );

		} );

	} );

} );
