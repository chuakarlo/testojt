define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/yourProfile/collections/WidgetCollection' );
	var Messages        = require( 'text!apps/homepage/external/widgets/external/yourProfile/configuration/messages.json' );

	var instance        = new BaseObj();

	App.Homepage.Utils.loadMessages( Messages );
	var message = App.Homepage.Utils.message;

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
		'WidgetId'        : 4,
		'WidgetName'      : function () {
			return message.userSettingsName;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return message.userSettingsDesc;
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
			return message.userSettingsFooter;
		},
		'_mainUrl'        : 'settings/profile'
	} );
} );
