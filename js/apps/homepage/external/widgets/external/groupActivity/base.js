define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/groupActivity/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/groupActivity/collections/WidgetCollection' );

	function doGetCollection ( callback, options ) {
		var collection = new CollectionItems( options );
		collection.fetch( {
			'success' : function ( collection ) {
				if ( App.request( 'homepage:isHomeRoute' ) ) {
					callback ( collection );
				}
			}
		} );
	}

	return instance.extend( {
		'WidgetId'        : 3,
		'WidgetName'      : function () {
			return 'Group Activity';
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return 'Get notified when there’s activity in one of your groups. Click on a group to go to that group’s activity wall.';
		},
		'imgSrc'          : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_group_zps11338045.png';
		},
		'icon'            : function () {
			return this.imgSrc();
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'_id'             : 'groupActivity',
		'EmptyMessage'    : function () {
			return '';
		},
		'EmptyType'       : function () {
			return 'fa-group';
		},
		'_footer'         : function ( ) {
			return 'See All Groups';
		},
		'_mainUrl'        : 'groups'
	} );
} );
