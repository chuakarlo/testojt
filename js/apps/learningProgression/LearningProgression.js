define( function ( require ) {
	'use strict';

	var ShowController = require( './controllers/showController' );
	var Marionette     = require( 'marionette' );
	var Vent           = require( 'Vent' );

	return function ( LearningProgression, App ) {

		App.module( 'LearningProgression.Show', ShowController );

		LearningProgression.Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'learningProgression' : 'showLearningProgession'
			}

		} );

		var API = {

			'showLearningProgession' : function () {
				Vent.trigger( 'pd360:hide' );
				LearningProgression.Show.Controller.showLearningProgession();
			}

		};

		App.addInitializer( function () {
			new LearningProgression.Router( {
				'controller' : API
			} );
		} );

	};

} );
