define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var BaseObj    = require( 'apps/homepage/BaseObject' );
	var Collection = require( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );
	var controller = require( 'apps/homepage/external/content/external/recommended/controllers/baseController' );
	var template   = require( 'text!apps/homepage/external/content/external/recommended/templates/recommendedHeaderView.html' );

	var instance           = new BaseObj();


	return instance.extend({
		'_id'              : 'recommended',
		'_header'          : _.template( template ),
		'getCollection'    : Collection,
		'getFetchLogic'    : function ( collectionParam ) {
			return controller.doFetchLogic( collectionParam );
		},
		'getPreFetchLogic' : function ( options, callback ) {
			controller.doPreFetchLogic( options, callback );
		},
		'renderToggle' : function ( collection, model ) {
			return controller.doRenderToggle( collection, model );
		},
		'getCarouselCustomAction' : function ( view, data, start ) {
			//do carousel custom action here
			return controller.doCarouselCustomAction(view, data, start, this);
			//temporary only to demo after fetching another set

		}
	} );
} );