define( function ( require ) {
	'use strict';

	var BaseObj  = require( 'apps/homepage/BaseObject' );
	var itemView = require( 'apps/homepage/external/content2/views/ContentCollectionView' );
	var instance = new BaseObj();
	instance._id = 'recommended';

	return instance.extend({
		'getExternalView' : itemView
	} );
} );
