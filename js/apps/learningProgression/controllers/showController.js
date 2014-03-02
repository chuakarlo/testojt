define( function ( require ) {
	'use strict';

	var LearningProgressionView = require( 'learningProgression/views/LearningProgressionView' );

	return function ( Show, App ) {

		Show.Controller = {

			'showLearningProgession' : function () {
				App.content.show( new LearningProgressionView() );
			}

		};

	};
	
} );
