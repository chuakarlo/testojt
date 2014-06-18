define( function ( require ) {
	'use strict';

	var App = require('App');
	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var Messages        = require( 'text!apps/homepage/external/widgets/external/null/configuration/messages.json' );
	var instance     = new BaseObj();

	App.Homepage.Utils.loadMessages(Messages);
	var message = App.Homepage.Utils.message;

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'    : 0,
		'WidgetName'  : function () {
			return message.nullTitle;
		},
		'header'      : function () {
			return message.nullTitle;
		},
		'footer'      : function () {
			return message.nullFooter;
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
