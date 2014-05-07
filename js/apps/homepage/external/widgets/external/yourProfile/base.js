define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/yourProfile/collections/WidgetCollection' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/widgets/external/yourProfile/views/InactiveWidgetItemView' );

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
		'WidgetId'        : 4,
		'WidgetName'      : function () {
			return 'User Settings';
		},
		'header'          : function () {
			return 'User Settings';
		},
		'footer'          : function () {
			return 'Edit Settings';
		},
		'Description'     : function () {
			return 'Have quick access to your Profile';
		},
		'imgSrc'          : function () {
			return 'img/homepage-widgets/profile.png';
		},
		'em'              : 8.5,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'getTemplate'     : InactiveWidgetItemView,
		'_id'             : 'yourProfile',
		'_header'         : function () {
			return 'User Settings';
		},
		'EmptyMessage'    : function () {
			return '';
		},
		'_footer'         : function ( ) {
			return 'Edit Settings';
		},
		'_mainUrl'        : '#settings/profile'
	} );
} );
