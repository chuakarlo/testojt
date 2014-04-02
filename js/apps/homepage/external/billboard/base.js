define( function ( require ) {
	'use strict';

	var BaseObj  = require( 'apps/homepage/BaseObject' );
	var itemView = require( 'apps/homepage/external/billboard/views/BillboardItemView' );
	var instance = new BaseObj();
	instance._id = 'billboard';

	return instance.extend( {
		'getExternalView': itemView
	} );

} );