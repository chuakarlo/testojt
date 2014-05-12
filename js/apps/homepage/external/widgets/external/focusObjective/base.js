define( function ( require ) {
	'use strict';

	var BaseObj                = require( 'apps/homepage/BaseObject' );
	var instance               = new BaseObj();
	var WidgetItemView         = require( 'apps/homepage/external/widgets/external/focusObjective/views/WidgetItemView' );
	var CollectionItems        = require( 'apps/homepage/external/widgets/external/focusObjective/collections/WidgetCollection' );
	var InactiveWidgetItemView = require( 'apps/homepage/external/widgets/external/focusObjective/views/InactiveWidgetItemView' );

	instance._id = 'widgets';

	return instance.extend( {
		'WidgetId'        : 2,
		'WidgetName'      : function () {
			return 'Focus Objectives';
		},
		'header'          : function () {
			return 'Focus Objectives';
		},
		'footer'          : function () {
			return 'See All Focus Objectives';
		},
		'Description'     : function () {
			return 'See a list of videos that are in your focus objectives folders. Click on a video to watch it.';
		},
		'imgSrc'          : function () {
			return 'img/homepage-widgets/focusObjective.png';
		},
		'icon'            : function () {
			return 'img/homepage-widgets/focusObjective.png';
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView, // items template
		'getCollection'   : function ( callback, options ) {
			var collection = new CollectionItems( options );

			collection.fetch( {
				'success' : function ( collection ) {
					callback ( collection );
				}
			} );
		},
		'_mainUrl'        : '/index.html#resources/learning/processes',
		'getTemplate'     : InactiveWidgetItemView,
		'_id'             : 'focusObjective',
		'_header'         : function () {
			return 'Focus Objectives';
		},
		'EmptyMessage'    : function () {
			return 'No available videos!';
		},
		'_footer'         : function ( ) {
			return 'See All Focus Objectives';
		}
	} );
} );
