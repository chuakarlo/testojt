define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/courses/courses.html' );
	var CoursesItemView = require( 'apps/learningTargets/views/courses/CoursesItemView' );
	var _               = require( 'underscore' );

	return Marionette.CompositeView.extend( {
		'initialize'        : function () {
			this.collection.selectedCourseId = this.options.selectedCourseId;
		},
		'tagName'           : 'div',
		'className'         : 'lt-content-courses',
		'template'          : _.template( template ),
		'itemView'          : CoursesItemView,
		'itemViewContainer' : '.lt-list'
	} );

} );
