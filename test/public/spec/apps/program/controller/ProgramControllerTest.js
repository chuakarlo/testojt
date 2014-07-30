define( function ( require ) {
	'use strict';

	var sinon  = window.sinon;
	var App    = require( 'App' );
	var assert = require( 'chai' ).assert;

	describe( 'Program - ProgramControllerTest', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'Program' ).stop();
		} );

		it( 'should have methods', function () {

			App.Program.Controller.ProgramPage.should.have.property( 'Show' );
			App.Program.Controller.ProgramPage.should.have.property( 'processQueryString' );
			App.Program.Controller.ProgramPage.should.have.property( 'setupProgramDetails' );
			App.Program.Controller.ProgramPage.should.have.property( 'displayProgramDetails' );
			App.Program.Controller.ProgramPage.should.have.property( 'setupSegments' );
			App.Program.Controller.ProgramPage.should.have.property( 'displaySegments' );
			App.Program.Controller.ProgramPage.should.have.property( 'onClose' );

		} );

		describe( 'Show', function () {

			var processStub;

			var arg = {
				'query' : 'ContentId=8173&ContentParentId=7193&ContentTypeId=3'
			};

			before( function () {

				var fragmentStub = sinon.stub().returns( false );
				App.reqres.setHandler( 'program:isCorrectFragment', fragmentStub );

				var routeStub = sinon.stub().returns( false );
				App.reqres.setHandler( 'program:isCorrectRoute', routeStub );

				processStub = sinon.stub( App.Program.Controller.ProgramPage, 'Show' );
				App.Program.Controller.ProgramPage.Show( arg );
			} );

			after( function () {
				App.reqres.removeHandler( 'program:isCorrectFragment' );
				App.reqres.removeHandler( 'program:isCorrectRoute' );
				processStub.restore();
			} );

			it( 'should call processQueryString', function () {
				processStub.should.have.been.calledWith( arg );
			} );
		} );

		describe( 'processQueryString', function () {
			var setupStub;

			var queryString = 'ContentId=8173&ContentParentId=7193&ContentTypeId=3';

			before( function () {
				setupStub = sinon.stub( App.Program.Controller.ProgramPage, 'setupProgramDetails' );
				App.Program.Controller.ProgramPage.queryArgs = { };
				App.Program.Controller.ProgramPage.processQueryString( queryString );
			} );

			after( function () {
				setupStub.restore();
			} );

			it( 'should call setupProgramDetails', function () {
				assert( setupStub.calledOnce );
			} );
		} );

		describe( 'displayProgramDetails', function () {
			var details = {
				'ProgramName'        : 'Program Test',
				'ProgramDescription' : 'Unit Test for Program'
			};

			var setupStub;

			before( function () {
				App.Program.Controller.ProgramPage.layout = new App.Program.Views.ProgramLayout();
				setupStub = sinon.stub( App.Program.Controller.ProgramPage, 'setupSegments' );
				App.Program.Controller.ProgramPage.displayProgramDetails( details );
			} );

			after( function () {
				setupStub.restore();
			} );

			it( 'should call setupSegments', function () {
				assert( setupStub.calledOnce );
			} );
		} );

	} );
} );
