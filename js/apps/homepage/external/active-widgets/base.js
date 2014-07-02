define( function ( require ) {
	'use strict';

	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var WidgetLayout = require( 'apps/homepage/external/active-widgets/views/ActiveWidgetLayoutView' );
	var instance     = new BaseObj();

	instance._id = 'active-widgets';

	return instance.extend( {
		'getExternalView' : WidgetLayout
	} );
} );
