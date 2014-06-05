define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/processOfMe/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/processOfMe/collections/WidgetCollection' );

	function doGetCollection ( callback, options ) {
		var collection = new CollectionItems( options );

		collection.fetch( {
			'success' : function ( collection ) {
				if ( App.request( 'homepage:isHomeRoute' ) ) {
					callback ( collection );
				}
			}
		} );
	}

	return instance.extend( {
		'WidgetId'        : 6,
		'WidgetName'      : function () {
			return 'Process Of Me';
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return 'See a list of videos that are in your focus objectives folders. Click on a video to watch it.';
		},
		'imgSrc'          : function () {
			return '/img/homepage-widgets/processOfMe.png';
		},
		'icon'            : function () {
			return this.imgSrc();
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView, // items template
		'getCollection'   : function ( callback, options ) {
			doGetCollection( callback, options );
		},
		'_mainUrl'        : 'resources/learning/processes',
		'_id'             : 'processOfMe',
		'EmptyMessage'    : function () {
			return 'No available videos to show.';
		},
		'EmptyType'       : function () {
			return 'fa-video-camera';
		},
		'_footer'         : function ( ) {
			return 'See All Processes';
		}
	} );
} );
