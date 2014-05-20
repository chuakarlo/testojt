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
		'WidgetId'        : 1,
		'WidgetName'      : function () {
			return 'Courses';
		},
		'header'          : function () {
			return 'Courses';
		},
		'footer'          : function () {
			return 'See All Courses';
		},
		'Description'     : function () {
			return 'See the courses you haven’t completed. Click on an unfinished course to pick up right where you left off.';
		},
		'imgSrc'          : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_courses_zps2b594805.png';
		},
		'icon'            : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_courses_zps2b594805.png';
		},
		'em'              : 8.5,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'getTemplate'     : InactiveWidgetItemView,
		'_id'             : 'courses',
		'_header'         : function () {
			return 'Courses';
		},
		'_footer'         : function ( ) {
			return 'See All Courses';
		},
		'EmptyMessage'    : function () {
			return 'No available courses to show.';
		},
		'EmptyType'       : function () {
			return 'fa-list-ol';
		},
		'_mainUrl'        : '#resources/learning/courses'
	} );
} );
