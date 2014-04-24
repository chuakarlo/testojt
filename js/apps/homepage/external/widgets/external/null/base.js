define( function ( require ) {
	'use strict';

	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'    : 0,
		'WidgetName'  : function () {
			return 'I am empty';
		},
		'header'      : function () {
			return 'I am empty';
		},
		'footer'      : function () {
			return 'Add more widgets';
		},
		'Description' : function () {
			return '';
		},
		'imgSrc'      : function () {
			return '';
		},
		'em'          : 8.5
	} );
} );