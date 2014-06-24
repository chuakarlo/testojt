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
			return App.Homepage.Utils.message.groupActivityTitle;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return App.Homepage.Utils.message.groupActivityDescription;
		},
		'imgSrc'          : function () {
			return '/img/src_group_zps11338045.png';
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
			return App.Homepage.Utils.message.groupActivityFooter;
		},
		'_mainUrl'        : 'groups'
	} );
} );
