define( function ( require ) {
	'use strict';

	var App          = require('App');
	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var WidgetLayout = require( 'apps/homepage/external/widgets/layout/WidgetLayout' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	var messages = require( 'text!apps/homepage/external/widgets/configuration/messages.json' );
	App.Hompage.Utils.loadMessages(messages);

	return instance.extend( {
		'getExternalView' : WidgetLayout
	} );
} );
