define( function ( require ) {
	'use strict';

	var Marionette                  = require( 'marionette' );
	var template                    = require( 'text!apps/learningTargets/templates/reflectionQuestions/reflectionQuestions.html' );
	var ReflectionQuestionsItemView = require( 'apps/learningTargets/views/reflectionQuestions/ReflectionQuestionsItemView' );
	var EmptyView                   = require( 'apps/learningTargets/views/EmptyView' );
	var _                           = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'tagName'           : 'div',
		'className'         : 'lt-content-courses',
		'template'          : _.template( template ),
		'itemView'          : ReflectionQuestionsItemView,
		'emptyView'         : EmptyView,
		'itemViewContainer' : '.lt-list'
	} );

} );
