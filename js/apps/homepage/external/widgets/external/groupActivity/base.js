define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/groupActivity/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/groupActivity/collections/WidgetCollection' );

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
		'WidgetId'        : 3,
		'WidgetName'      : function () {
			return 'Group Activity';
		},
		'header'          : function () {
			return 'Group Activity';
		},
		'footer'          : function () {
			return 'See All Groups';
		},
		'Description'     : function () {
			return 'Get notified when there’s activity in one of your groups. Click on a group to go to that group’s activity wall.';
		},
		'imgSrc'          : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_group_zps11338045.png';
		},
		'icon'            : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_group_zps11338045.png';
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'_id'             : 'groupActivity',
		'_header'         : function () {
			return 'Group Activity';
		},
		'EmptyMessage'    : function () {
			return 'No recent group activities.';
		},
		'EmptyType'       : function () {
			return 'fa-group';
		},
		'_footer'         : function ( ) {
			return 'See All Groups';
		},
		'_mainUrl'        : '#groups'
	} );
} );
