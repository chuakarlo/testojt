define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/observationsOfMe/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/observationsOfMe/collections/WidgetCollection' );
	var Messages        = require( 'text!apps/homepage/external/widgets/external/observationsOfMe/configuration/messages.json' );

	var instance        = new BaseObj();

	App.Homepage.Utils.loadMessages( Messages );
	var message = App.Homepage.Utils.message;

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
			return message.observationsTitle;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return message.observationsDescription;
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
			return message.observationsFooter;
		},
		'_mainUrl'        : 'resources/learning/observations'
	} );
} );
