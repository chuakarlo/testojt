 define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var sinon      = window.sinon;

	require( 'apps/learningTargets/LearningTargets' );

	var CoursesView = require( 'apps/learningTargets/views/courses/CoursesView' );

	describe( 'Learning Targets Module', function () {

		var loadingView;

		before( function () {
			// creates a dummy COMMON submodule
			App.module( 'Common', function ( common, App ) {
				loadingView = common.LoadingView;
				common.LoadingView = function() {
					return {
						'loading' : 'view'
					};
				};
			} );
		} );

		after( function () {
			App.module( 'Common' ).stop();
			App.module( 'LearningTargets' ).stop();
			App.module( 'Common', function ( common, App ) {
				common.LoadingView = loadingView;
			} );
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

				helper._setContent.restore();
				helper._showView.restore();
				helper._apiRequest.restore();

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
				var navigateStub;

				before( function () {
					// App.navigate stub
					navigateStub = sinon.stub( App, 'navigate' );

					// invoke `showMain` method
					App.LearningTargets.Main.controller.showMain();
				} );

				after( function () {
					// restore stubs and mocks
					navigateStub.restore();
				} );

				it( 'should navigate to `resources/learning/processes`', function () {
					navigateStub.should.have.been.calledWith( 'resources/learning/processes', true );
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

				it( 'should display loading view', function () {
					showView.should.have.been.calledWith( { 'loading' : 'view' } );
				} );

				it( 'should send request to API', function () {
					request.should.have.been.calledWith( 'lt:processes' );
				} );

			} );

			describe( 'method `showPortfolio`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showPortfolio();
				} );

				it( 'should setup content for `portfolio`', function () {
					setContent.should.have.been.calledWith( 'portfolio' );
				} );

				it( 'should display loading view', function () {
					showView.should.have.been.calledWith( { 'loading' : 'view' } );
				} );

				it( 'should send request to API', function () {
					request.should.have.been.calledWith( 'lt:portfolios' );
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

			describe( 'method `showObservations`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showObservations();
				} );

				it( 'should setup content for `observations`', function () {
					setContent.should.have.been.calledWith( 'observations' );
				} );

				it( 'should display loading view', function () {
					showView.should.have.been.calledWith( { 'loading' : 'view' } );
				} );

				it( 'should send request to API', function () {
					request.should.have.been.calledWith( 'lt:observations' );
				} );

			} );

			describe( 'method `showCatalogs`', function () {
				before( function () {
					App.LearningTargets.Main.controller.showCatalogs();
				} );

				it( 'should setup content for `catalogs`', function () {
					setContent.should.have.been.calledWith( 'catalogs' );
				} );

				it( 'should display loading view', function () {
					showView.should.have.been.calledWith( { 'loading' : 'view' } );
				} );

				it( 'should send request to API', function () {
					request.should.have.been.calledWith( 'lt:catalogs' );
				} );

			} );

		} );

	} );

} );
