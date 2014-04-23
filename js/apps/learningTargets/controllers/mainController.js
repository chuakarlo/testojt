define( function ( require ) {
	'use strict';

	var App              = require( 'App' );
	var MainView         = require( 'apps/learningTargets/views/MainView' );
	var CoursesView      = require( 'apps/learningTargets/views/courses/CoursesView' );
	var ProcessesView    = require( 'apps/learningTargets/views/processes/ProcessesView' );
	var ObservationsView = require( 'apps/learningTargets/views/observations/ObservationsView' );
	var PortfoliosView   = require( 'apps/learningTargets/views/portfolios/PortfoliosView' );
	var QuestionsView    = require( 'apps/learningTargets/views/questions/QuestionsView' );
	var Backbone         = require( 'backbone' );
	var $                = require( 'jquery' );

	App.module( 'LearningTargets.Main', function ( Main ) {
		var mainView, contentRegion;

		Main.regions = {
			'Content' : Backbone.Marionette.Region.extend( { } )
		};

		Main.helper = {

			'_showView' : function ( view ) {
				contentRegion.show( view );
			},

			'_setContent' : function ( content ) {

				// show main view
				if ( !mainView ) {
					mainView = new MainView();
				}
				App.content.show( mainView );

				contentRegion = new Main.regions.Content( {
					el : mainView.el.querySelector( '.lt-content' )
				} );

				mainView.activateTab( content );
			},

			'_apiRequest' : function ( type, callback ) {
				var request = App.request( type );

				$.when( request ).done( function ( collections ) {
					// run callback with collections
					callback( collections );
				} ).fail( function ( error ) {
					// TODO: handle error
					throw error;
				} );
			}

		};

		Main.controller = {

			'showMain' : function () {
				if ( App.PD360.hide ) {
					App.PD360.hide();
				}
				App.navigate( 'resources/learning/processes', true );
			},

			'showCourses' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'courses' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:courses', function( collection ) {
					var coursesView = new CoursesView( {
						collection : collection
					} );

					// display Courses
					helper._showView( coursesView );
				} );

			},

			'showProcesses' : function () {
				var helper = Main.helper;

				helper._setContent( 'processes' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				var processesView = new ProcessesView( {
					collection : new Backbone.Collection( [ { }, { } ] ) // temporary implementation
				} );

				helper._showView( processesView );
			},

			'showPortfolio' : function () {
				var helper = Main.helper;

				// set content
				helper._setContent( 'portfolio' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:portfolios', function( collection ) {
					var portfoliosView = new PortfoliosView( {
						collection : collection
					} );

					// display Courses
					helper._showView( portfoliosView );
				} );

			},

			'showObservations' : function () {
				var helper = Main.helper;
				helper._setContent( 'observations' );

				// show a loading view while data is fetching
				helper._showView( new App.Common.LoadingView() );

				helper._apiRequest( 'lt:observations', function( collection ) {
					var observationsView = new ObservationsView( {
						collection : collection
					} );

					helper._showView( observationsView );
				} );
			},

			'showQuestions' : function () {
				var helper = Main.helper;
				helper._setContent( 'questions' );

				var questionsView = new QuestionsView( {
					collection : new Backbone.Collection( [ { }, { }, { } ] ) // temporary implementation
				} );

				helper._showView( questionsView );
			}

		};

	} );



} );
