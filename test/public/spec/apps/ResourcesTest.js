define( function ( require ) {
	'use strict';

	var sinon = window.sinon;
	var resourcesModule = require( 'apps/resources' );

	describe( 'Resources Module', function () {
		var App = { 'module' : function () {} };
		var spy;

		before( function () {
			spy = sinon.spy( App, 'module' );
			resourcesModule( null, App );
		} );

		it( 'should load 5 modules', function () {
			spy.should.have.callCount( 5 );
		} );

		it( 'should load `Communities` module', function () {
			spy.should.have.been.calledWith( 'Communities' );
		} );

		it( 'should load `Search` module', function () {
			spy.should.have.been.calledWith( 'Search' );
		} );

		it( 'should load `Observation` module', function () {
			spy.should.have.been.calledWith( 'Observation' );
		} );

		it( 'should load `LumiBook` module', function () {
			spy.should.have.been.calledWith( 'LumiBook' );
		} );

		it( 'should load `LearningProgression` module', function () {
			spy.should.have.been.calledWith( 'LearningProgression' );
		} );

	} );
} );
