define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/groupActivity/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/groupActivity/collections/WidgetCollection' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/widgets/external/groupActivity/views/InactiveWidgetItemView' );

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
			return 'Have quick access to your Group Activity';
		},
		'imgSrc'          : function () {
			return 'img/homepage-widgets/groupActivity.png';
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'getTemplate'     : InactiveWidgetItemView,
		'_id'             : 'groupActivity',
		'_header'         : function () {
			return 'Group Activity';
		},
		'EmptyMessage'    : function () {
			return 'No groups shared recent activities!';
		},
		'_footer'         : function ( ) {
			return 'See All Groups';
		},
		'_mainUrl'        : '/dev.html#groups'
	} );
} );
