define( function ( require ) {
	'use strict';

	var BaseObj    = require( 'apps/homepage/BaseObject' );
	var collection = require( 'apps/homepage/external/content/external/your-queue/collections/QueueCollection' );
	var controller = require( 'apps/homepage/external/content/external/your-queue/controllers/baseController' );
	var instance   = new BaseObj();

	return instance.extend({
		'_id'           : 'your-queue',
		'_header'       : function ( ) {
			return controller.doSetHeader();
		},
		'getCollection' : collection,
		'getFetchLogic' : function ( collectionParam ) {
			return controller.doFetchLogic( collectionParam );
		},
		'renderToggle' : function( collection, model ) {
			return 'remove-from-queue';
		},
		'getCarouselCustomAction' : function ( collection, view, element, id ) {
			//do carousel custom action here
		}
	} );
} );