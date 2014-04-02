define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var WidgetItemView         = require( 'apps/homepage/external/what-to-do-next/external/learning-targets/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/what-to-do-next/external/learning-targets/views/InactiveWidgetItemView' );
	var instance               = new BaseObj();
	var CollectionItems        = require( 'apps/homepage/external/what-to-do-next/external/learning-targets/collections/WidgetCollection' );

	return instance.extend( {
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			var collection = new CollectionItems( options );
			collection.fetch( {
				'success' : function ( collection ) {
					callback ( collection );
				}

			} );

		},
		'getTemplate' : InactiveWidgetItemView,
		'_id'         : 'learningTargets',
		'_header'     : function () {
			return 'Learning Targets';
		},
		'_footer'     : function ( collection ) {
			return 'See all (' + collection.length + ')';
		},
		'_mainUrl' : '#'
	} );
} );