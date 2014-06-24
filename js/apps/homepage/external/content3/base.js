define( function ( require ) {
	'use strict';

	var BaseObj  = require( 'apps/homepage/BaseObject' );
	var itemView = require( 'apps/homepage/external/content3/views/ContentCollectionView' );
	var instance = new BaseObj();
	instance._id = 'sample';

	return instance.extend({
		'getExternalView' : itemView
	} );
} );
