define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/observationsOfMe/collections/WidgetCollection' );

	var instance        = new BaseObj();

	function doGetCollection ( callback, options ) {
		var collection = new CollectionItems( options );

		collection.fetch( {

			'success' : function ( collection ) {
				if ( App.request( 'homepage:isHomeRoute' ) ) {
					callback ( collection );
				}
			},

			'error' : function () {
				App.errorHandler( new Error( App.Homepage.Utils.message.observationsErrMsg ) );
			}

		} );
	}

	return instance.extend( {
		'WidgetId'        : 5,
		'WidgetName'      : function () {
			return App.Homepage.Utils.message.observationsTitle;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return App.Homepage.Utils.message.observationsDescription;
		},
		'imgSrc'          : function () {
			return '/img/src_Observations_zps8bc3f1ab.png';
		},
		'icon'            : function () {
			return this.imgSrc();
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'_id'             : 'observationsOfMe',
		'EmptyMessage'    : function () {
			return '';
		},
		'EmptyType'       : function () {
			return 'fa-eye-empty';
		},
		'_footer'         : function ( ) {
			return App.Homepage.Utils.message.observationsFooter;
		},
		'_mainUrl'        : 'resources/learning/observations'
	} );
} );
