define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var WidgetItemView         = require( 'apps/homepage/external/what-to-do-next/external/group-activity/views/WidgetItemView' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/what-to-do-next/external/group-activity/views/InactiveWidgetItemView' );
	var instance               = new BaseObj();
	var CollectionItems        = require( 'apps/homepage/external/what-to-do-next/external/group-activity/collections/WidgetCollection' );

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
		'_id'         : 'groupActivity',
		'_header'     : function () {
			return 'Group Activity';
		},
		'_footer'     : function ( collection ) {
			return 'See your groups';
		},
	} );
} );