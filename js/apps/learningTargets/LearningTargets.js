define( function ( require ) {
	'use strict';

	return function () {

		var App        = require ( 'App' );
		var AuthRouter = require ( 'AuthRouter' );

		require ( 'apps/learningTargets/controllers/mainController' );
		require ( 'apps/learningTargets/entities/Courses' );
		require ( 'apps/learningTargets/entities/Observations' );
		require ( 'apps/learningTargets/entities/Objectives' );
		require ( 'apps/learningTargets/entities/Portfolios' );
		require ( 'apps/learningTargets/entities/Processes' );
		require ( 'apps/learningTargets/entities/Catalogs' );
		require ( 'apps/learningTargets/entities/Groups' );
		require ( 'apps/learningTargets/entities/CatalogDescriptions' );

		App.module( 'LearningTargets', function ( LearningTargets, App ) {

			// configure routes
			LearningTargets.Router = AuthRouter.extend ( {

				'appRoutes' : {
					'resources/learning'                  : 'showMain',
					'resources/learning/courses'          : 'showCourses',
					'resources/learning/courses/:id'      : 'showCoursesWithId',
					'resources/learning/processes'        : 'showProcesses',
					'resources/learning/observations'     : 'showObservations',
					'resources/learning/observations/:id' : 'showObservationsWithId',
					'resources/learning/portfolio'        : 'showPortfolio',
					'resources/learning/catalogs'         : 'showCatalogs',
					'resources/learning/group-task'       : 'showGroups',
					'resources/learning/focus-objectives' : 'showFocusObjectivesTitle',

					'resources/learning/objectives/:focustitle/:ncesid/:statestdid' : 'showFocusObjectivesContent'
				}
			} );

			App.addInitializer ( function () {

				new LearningTargets.Router( {
					'controller' : LearningTargets.Main.controller
				} );

			} );

		} );

	};

} );
