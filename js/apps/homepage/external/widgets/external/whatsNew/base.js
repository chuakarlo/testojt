define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/whatsNew/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/whatsNew/collections/WidgetCollection' );

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'        : 6,
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
			return 'Check out the newest videos as they become available. Click on a video to watch it.';
		},
		'imgSrc'          : function () {
			return 'img/homepage-widgets/whatsNew.png';
		},
		'icon'            : function () {
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
		'_id'             : 'whatsNew',
		'_header'         : function () {
			return 'What\'s New';
		},
		'EmptyMessage'    : function () {
			return 'No new activities to show.';
		},
		'EmptyType'       : function () {
			return 'fa-magic';
		},
		'_footer'         : function ( ) {
			return 'See All What\'s New';
		}
	} );
} );
