define( function ( require ) {
	'use strict';

	var App = require( 'App' );
	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'    : 0,
		'WidgetName'  : function () {
			return App.Homepage.Utils.message.nullTitle;
		},
		'header'      : function () {
			return App.Homepage.Utils.message.nullTitle;
		},
		'footer'      : function () {
			return App.Homepage.Utils.message.nullFooter;
		},
		'Description' : function () {
			return '';
		},
		'imgSrc'      : function () {
			return '';
		},
		'icon'        : function () {
			return '';
		},
		'em'          : 8.5
	} );
} );
