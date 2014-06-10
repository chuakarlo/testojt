define( function ( require ) {
	'use strict';

	var Marionette                  = require( 'marionette' );
	var template                    = require( 'text!apps/learningTargets/templates/reflectionQuestions/reflectionQuestions.html' );
	var ReflectionQuestionsItemView = require( 'apps/learningTargets/views/reflectionQuestions/ReflectionQuestionsItemView' );
	var EmptyView                   = require( 'apps/learningTargets/views/EmptyView' );
	var _                           = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'tagName'           : 'div',
		'template'          : _.template( template ),
		'itemView'          : ReflectionQuestionsItemView,
		'emptyView'         : EmptyView,
		'className'         : 'lt-content-reflection-questions',
		'itemViewContainer' : '.lt-list'
	} );

} );
