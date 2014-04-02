define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var WidgetItemView         = require( 'apps/homepage/external/what-to-do-next/external/whats-new/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/what-to-do-next/external/whats-new/views/InactiveWidgetItemView' );
	var instance               = new BaseObj();
	var CollectionItems  = require( 'apps/homepage/external/what-to-do-next/external/whats-new/collections/WidgetCollection' );

	return instance.extend( {
		'getExternalView' : WidgetItemView, // items template
		'getCollection'   : function ( callback, options ) {
			var collection = new CollectionItems( options );

			collection.fetch( {
				'success' : function ( collection ) {
					callback ( collection );
				}
			} );
		},
		'_mainUrl'    : '#',
		'getTemplate' : InactiveWidgetItemView,
		'_id'         : 'whatsNew',
		'_header'     : function () {
			return 'What\'s New';
		},
		'_footer'     : function ( collection ) {
			return 'See All ( ' + collection.length + ' )';
		},
	} );
} );