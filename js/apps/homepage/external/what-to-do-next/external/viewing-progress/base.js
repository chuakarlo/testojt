define(function(require) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var WidgetItemView         = require( 'apps/homepage/external/what-to-do-next/external/viewing-progress/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/what-to-do-next/external/viewing-progress/views/InactiveWidgetItemView' );
	var instance               = new BaseObj();
	var CollectionItems        = require( 'apps/homepage/external/what-to-do-next/external/viewing-progress/collections/WidgetCollection' );

	return instance.extend( {
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options )  {
			var collection = new CollectionItems( options );
			collection.fetch( {
				'success' : function( collection ) {
					var filteredResults = collection.filter( function ( videoCollection ) {
						return videoCollection.get( 'completion' ) > 0 && videoCollection.get( 'completion' ) < 100;
					} );
					var sortedCollection = new CollectionItems( filteredResults );
					collection = sortedCollection.sort();
					callback( collection );
				}
			});
		},
		'getTemplate' : InactiveWidgetItemView,
		'_id'         : 'viewingProgress',
		'_header'     : function () {
			return 'Viewing Progress';
		},
		'_footer'     : function ( collection ) {
			return 'See All';
		},
		'_mainUrl'    : '#'
	});
});