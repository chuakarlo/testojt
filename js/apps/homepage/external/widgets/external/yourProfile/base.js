define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/yourProfile/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/yourProfile/collections/WidgetCollection' );

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
			return 'User Settings';
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return 'Access your profile settings, licenses, and personal usage report. Plus, get a snapshot of how complete your profile is. Remember, the more complete your profile, the more useful PD 360 is for you.';
		},
		'imgSrc'          : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_userSettings_zpse7ae34fc.png';
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
			return 'Edit Settings';
		},
		'_mainUrl'        : '#settings/profile'
	} );
} );
