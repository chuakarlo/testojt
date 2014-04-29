define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/courses/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/courses/collections/WidgetCollection' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/widgets/external/courses/views/InactiveWidgetItemView' );

	instance._id = 'widgets';

	function doGetCollection ( callback, options ) {
		var collection = new CollectionItems( options );
		collection.fetch( {
			'success' : function ( collection ) {
				callback ( collection );
			}
		} );
	}

	return instance.extend( {
		'WidgetId'    : 1,
		'WidgetName'  : function () {
			return 'Courses';
		},
		'header'      : function () {
			return 'Courses';
		},
		'footer'      : function () {
			return 'See All Courses';
		},
		'Description' : function () {
			return 'Have quick access to your courses.';
		},
		'imgSrc'      : function () {
			return 'img/homepage-widgets/courses.png';
		},
		'em'          : 8.5,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'getTemplate' : InactiveWidgetItemView,
		'_id'         : 'groupActivity',
		'_header'     : function () {
			return 'Courses';
		},
		'_footer'     : function ( ) {
			return 'See All Courses';
		},
		'_mainUrl' : '/dev.html#resources/learning/courses'

	} );
} );