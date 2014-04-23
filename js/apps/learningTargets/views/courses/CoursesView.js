define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var template        = require( 'text!apps/learningTargets/templates/courses/courses.html' );
	var CoursesItemView = require( 'apps/learningTargets/views/courses/CoursesItemView' );
	var _               = require( 'underscore' );
	var $               = require( 'jquery' );

	return Marionette.CompositeView.extend( {
		'tagName'			: 'ul',
		'className'			: 'lt-list media-list',
		'template'          : _.template( template ),
		'itemView'          : CoursesItemView,
		'itemViewContainer' : $( this ).el
	} );

} );
