define( function ( require ) {
	'use strict';

	var App          = require('App');
	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var WidgetLayout = require( 'apps/homepage/external/widgets/layout/WidgetLayout' );
	var messages     = require( 'text!apps/homepage/external/widgets/configuration/messages.json' );
	var instance     = new BaseObj();

	instance._id = 'widgets';
	App.Homepage.Utils.loadMessages( messages );

	return instance.extend( {
		'getExternalView' : WidgetLayout
	} );
} );
