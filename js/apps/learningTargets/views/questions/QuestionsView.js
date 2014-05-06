define( function ( require ) {
	'use strict';

	var Marionette           = require( 'marionette' );
	var template             = require( 'text!apps/learningTargets/templates/questions/questions.html' );
	var questionsItemView    = require( 'apps/learningTargets/views/questions/QuestionsItemView' );
	var _                    = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : questionsItemView,
		'itemViewContainer' : 'ul.lt-list'
	} );

} );
