define( function ( require ) {
	'use strict';

	var BaseObj            = require( 'apps/homepage/BaseObject' );
	var WhatToDoNextLayout = require( 'apps/homepage/external/what-to-do-next/layout/WhatToDoNextLayout' );
	var instance           = new BaseObj();

	instance._id = 'what-to-do-next';

	return instance.extend( {
		'getExternalView' : WhatToDoNextLayout
	} );
} );