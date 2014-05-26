define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/observationsOfMe/collections/WidgetCollection' );

	instance._id = 'widgets';

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
		'WidgetId'        : 5,
		'WidgetName'      : function () {
			return 'Observations Of Me';
		},
		'header'          : function () {
			return 'Observations Of Me';
		},
		'footer'          : function () {
			return 'See In Observations';
		},
		'Description'     : function () {
			return 'Get a glance at observations you’ve recently received. See the dates as well as any related recommended PD units.';
		},
		'imgSrc'          : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_Observations_zps8bc3f1ab.png';
		},
		'icon'            : function () {
			return 'http://i1032.photobucket.com/albums/a405/shinjiescorido/src_Observations_zps8bc3f1ab.png';
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'_id'             : 'observationsOfMe',
		'_header'         : function () {
			return 'Group Activity';
		},
		'EmptyMessage'    : function () {
			return 'No observation items to show.';
		},
		'EmptyType'       : function () {
			return 'fa-eye-slash';
		},
		'_footer'         : function ( ) {
			return 'See In Observations';
		},
		'_mainUrl'        : '#resources/learning/observations'
	} );
} );
