define( function ( require ) {
	'use strict';

	var BaseObj      = require( 'apps/homepage/BaseObject' );
	var WidgetLayout = require( 'apps/homepage/external/widgets/layout/WidgetLayout' );
	var instance     = new BaseObj();

	instance._id = 'widgets';

	return instance.extend( {
		'getExternalView' : WidgetLayout
	} );
} );
