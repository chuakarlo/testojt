define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var WidgetItemView         = require( 'apps/homepage/external/what-to-do-next/external/whats-hot/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/what-to-do-next/external/whats-hot/views/InactiveWidgetItemView' );
	var instance               = new BaseObj();
	var CollectionItems        = require( 'apps/homepage/external/what-to-do-next/external/whats-hot/collections/WidgetCollection' );

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
		'_id'         : 'whatsHot',
		'_header'     : function () {
			return 'What\'s Hot';
		},
		'_footer'     : function ( collection ) {
			return 'See All Hot Content';
		},
		'_mainUrl' : '#'
	} );
} );