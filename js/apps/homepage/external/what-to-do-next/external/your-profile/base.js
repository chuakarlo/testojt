define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var WidgetItemView         = require( 'apps/homepage/external/what-to-do-next/external/your-profile/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/what-to-do-next/external/your-profile/views/InactiveWidgetItemView' );
	var instance               = new BaseObj();
	var CollectionItems        = require( 'apps/homepage/external/what-to-do-next/external/your-profile/collections/WidgetCollection' );

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
		'_id'         : 'yourProfile',
		'_header'     : function () {
			return 'Your Profile';
		},
		'_footer'     : function ( collection ) {
			return 'Edit Your Profile';
		},
	} );
} );