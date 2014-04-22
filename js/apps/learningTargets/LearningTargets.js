define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var AuthRouter = require( 'AuthRouter' );

	require( 'apps/learningTargets/controllers/mainController' );
	require( 'apps/learningTargets/entities/Courses' );
	require( 'apps/learningTargets/entities/Observations' );

	App.module( 'LearningTargets', function ( LearningTargets, App ) {

		// configure routes
		LearningTargets.Router = AuthRouter.extend( {

			'appRoutes' : {
				'resources/learning'              : 'showMain',
				'resources/learning/courses'      : 'showCourses',
				'resources/learning/processes'    : 'showProcesses',
				'resources/learning/observations' : 'showObservations',
				'resources/learning/portfolio'    : 'showPortfolio',
				'resources/learning/questions'    : 'showQuestions'
			}

		} );

		App.addInitializer( function () {

			new LearningTargets.Router( {
				'controller' : LearningTargets.Main.controller
			} );

		} );

	} );

} );