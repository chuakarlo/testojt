define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'learningProgression/LearningProgression' );

	describe( 'Learning Progression Module', function () {

		after( function () {
			App.module( 'LearningProgression' ).stop();
		} );
		
		it( 'should create module `LearningProgression`', function () {
			App.should.have.property( 'LearningProgression' );
			App.LearningProgression.should.be.an.instanceof( Marionette.Module );
			App.LearningProgression.should.have.property( 'Router' );
			App.LearningProgression.should.have.property( 'Show' );
		} );

		describe( 'Show controller', function () {

			it( 'should create submodule Show', function () {
				App.LearningProgression.should.have.property( 'Show' );
				App.LearningProgression.Show.should.be.an.instanceof( Marionette.Module );
				App.LearningProgression.Show.should.have.property( 'Controller' );
				App.LearningProgression.Show.Controller.should.have.property( 'showLearningProgession' );
			} );

		} );

	} );
	
} );
