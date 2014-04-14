 define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var sinon      = window.sinon;

	require( 'learningTargets/LearningTargets' );

	var CoursesView = require( 'apps/learningTargets/views/courses/CoursesView' );

	describe( 'Learning Targets Module', function () {

		before( function () {
			// creates a dummy pd360 submodule
			App.module( 'PD360', function ( pd360, App ) {
				pd360.hide = function() {};
			} );

			// creates a dummy COMMON submodule
			App.module( 'Common', function ( common, App ) {
				common.LoadingView = function() {
					return {
						'loading' : 'view'
					};
				};
			} );
		} );

		after( function () {
			App.module( 'Common' ).stop();
			App.module( 'PD360' ).stop();
			App.module( 'LearningTargets' ).stop();
		} );

		it( 'should create a submodule called `LearningTargets`', function () {
			App.should.have.property( 'LearningTargets' );
			App.LearningTargets.should.be.an.instanceof( Marionette.Module );
		} );


		// Test Main submodule
		describe( 'Main controller', function () {
			var setContent, showView, request, courseView;

			var helper = App.LearningTargets.Main.helper;

			before( function () {
				courseView = new CoursesView();
				setContent = sinon.stub( helper, '_setContent' );
				showView   = sinon.stub( helper, '_showView' );
				request    = sinon.stub( helper, '_apiRequest' );
			} );

			after( function () {
				setContent.restore();
				showView.restore();
				request.restore();

				helper     = undefined;
				setContent = undefined;
				showView   = undefined;
				request    = undefined;

				App.module( 'LearningTargets.Main' ).stop();
			} );

			it( 'should create a submodule called `Main` with a property called `Controller`', function () {
				App.LearningTargets.should.have.property( 'Main' );
				App.LearningTargets.Main.should.have.property( 'controller' );
				App.LearningTargets.Main.should.be.an.instanceof( Marionette.Module );
			} );


			// Test Controller methods
			describe( 'method `showMain`', function () {
				var navigateStub, hideMock;

				before( function () {
					// App.PD360 mocks
					hideMock = sinon.mock( App.PD360 );
					hideMock.expects( 'hide' ).once();

					// App.navigate stub
					navigateStub = sinon.stub( App, 'navigate' );

					// invoke `showMain` method
					App.LearningTargets.Main.controller.showMain();
				} );

				after( function () {
					// restore stubs and mocks
					hideMock.restore();
					navigateStub.restore();

					// remove pointers
					hideMock     = undefined;
					navigateStub = undefined;
				} );

				it( 'should call hide on App.PD360 submodule', function () {
					hideMock.verify();
				} );

				it( 'should navigate to `resources/learning/courses`', function () {
					navigateStub.should.have.been.calledWith( 'resources/learning/courses', true );
				} );
			} );

			describe( 'method `showCourses`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showCourses();
				} );

				it( 'should setup content for `courses`', function () {
					setContent.should.have.been.calledWith( 'courses' );
				} );

				it( 'should display loading view', function () {
					showView.should.have.been.calledWith( { 'loading' : 'view' } );
				} );

				it( 'should send request to API', function () {
					request.should.have.been.calledWith( 'lt:courses' );
				} );

			} );

			describe( 'method `showProcesses`', function () {

				before( function () {
					App.LearningTargets.Main.controller.showProcesses();
				} );

				it( 'should setup content for `processes`', function () {
					setContent.should.have.been.calledWith( 'processes' );
				} );

			} );

			describe( 'method `showPortfolio`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showPortfolio();
				} );

				it( 'should setup content for `portfolio`', function () {
					setContent.should.have.been.calledWith( 'portfolio' );
				} );

			} );

			describe( 'method `showObservations`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showObservations();
				} );

				it( 'should setup content for `observations`', function () {
					setContent.should.have.been.calledWith( 'observations' );
				} );

			} );

			describe( 'method `showQuestions`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showQuestions();
				} );

				it( 'should setup content for `questions`', function () {
					setContent.should.have.been.calledWith( 'questions' );
				} );

			} );

		} );

	} );

} );
