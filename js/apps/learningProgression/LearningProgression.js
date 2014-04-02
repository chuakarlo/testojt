define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var Vent           = require( 'Vent' );
	var App            = require( 'App' );

	App.module( 'LearningProgression', function ( LearningProgression ) {

		require( 'learningProgression/controllers/showController' );

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

	} );

} );
