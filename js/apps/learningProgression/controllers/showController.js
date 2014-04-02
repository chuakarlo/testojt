define( function ( require ) {
	'use strict';

	var LearningProgressionView = require( 'learningProgression/views/LearningProgressionView' );
	var App                     = require( 'App' );

	App.module( 'LearningProgression.Show', function ( Show ) {

		Show.Controller = {

			'showLearningProgession' : function () {
				App.content.show( new LearningProgressionView() );
			}

		};

	} );

} );
