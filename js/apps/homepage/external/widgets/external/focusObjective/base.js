define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/focusObjective/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/focusObjective/collections/WidgetCollection' );

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
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_focusObjectives_zpsfa2cacc5.png';
		},
		'icon'            : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_focusObjectives_zpsfa2cacc5.png';
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView, // items template
		'getCollection'   : function ( callback, options ) {
			var collection = new CollectionItems( options );

			collection.fetch( {
				'success' : function ( collection ) {
					if ( App.request( 'homepage:isHomeRoute' ) ) {
						callback ( collection );
					}
				}
			} );
		},
		'_mainUrl'        : '#resources/learning/processes',
		'_id'             : 'focusObjective',
		'_header'         : function () {
			return 'Focus Objectives';
		},
		'EmptyMessage'    : function () {
			return 'No available videos to show.';
		},
		'EmptyType'       : function () {
			return 'fa-video-camera';
		},
		'_footer'         : function ( ) {
			return 'See All Focus Objectives';
		}
	} );
} );
