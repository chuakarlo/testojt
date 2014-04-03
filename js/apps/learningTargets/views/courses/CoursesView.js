define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/courses/courses.html' );
	var CoursesItemView = require( 'apps/learningTargets/views/courses/CoursesItemView' );
	var _               = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'template'          : _.template( template ),
		'itemView'          : CoursesItemView,
		'itemViewContainer' : 'ul.lt-list',
	} );

} );
