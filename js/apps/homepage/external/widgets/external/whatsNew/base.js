define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/whatsNew/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/whatsNew/collections/WidgetCollection' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/widgets/external/whatsNew/views/InactiveWidgetItemView' );

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'        : 4,
		'WidgetName'      : function () {
			return 'What\'s New';
		},
		'header'          : function () {
			return 'What\'s New';
		},
		'footer'          : function () {
			return 'See All What\'s New';
		},
		'Description'     : function () {
			return 'Have quick access to all new feeds';
		},
		'imgSrc'          : function () {
			return 'img/homepage-widgets/whatsNew.png';
		},
		'em'              : 8.5,
		'getExternalView' : WidgetItemView, // items template
		'getCollection'   : function ( callback, options ) {
			var collection = new CollectionItems( options );

			collection.fetch( {
				'success' : function ( collection ) {
					callback ( collection );
				}
			} );
		},
		'_mainUrl'        : '#',
		'getTemplate'     : InactiveWidgetItemView,
		'_id'             : 'whatsNew',
		'_header'         : function () {
			return 'What\'s New';
		},
		'EmptyMessage'    : function () {
			return 'No new activities!';
		},
		'_footer'         : function ( ) {
			return 'See All What\'s New';
		}
	} );
} );
