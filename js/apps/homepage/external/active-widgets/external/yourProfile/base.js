define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/yourProfile/collections/WidgetCollection' );

	var instance        = new BaseObj();

	function doGetCollection ( callback, options ) {
		var collection = new CollectionItems( options );
		collection.fetch( {
			'success' : function ( collection ) {
				if ( App.request( 'homepage:isHomeRoute' ) ) {
					callback ( collection );
				}
			},
			'error'   : function ( err ) {
				App.vent.trigger( 'flash:message', {
					message : 'User Profile: ' + err.message
				} );
			}
		} );
	}

	return instance.extend( {
		'WidgetId'        : 4,
		'WidgetName'      : function () {
			return App.Homepage.Utils.message.userSettingsName;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return App.Homepage.Utils.message.userSettingsDesc;
		},
		'imgSrc'          : function () {
			return '/img/src_userSettings_zpse7ae34fc.png';
		},
		'icon'            : function () {
			return this.imgSrc();
		},
		'em'              : 8.5,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'_id'             : 'yourProfile',
		'EmptyMessage'    : function () {
			return '';
		},
		'EmptyType'       : function () {
			return 'fa-user';
		},
		'_footer'         : function ( ) {
			return App.Homepage.Utils.message.userSettingsFooter;
		},
		'_mainUrl'        : 'settings/profile'
	} );
} );
