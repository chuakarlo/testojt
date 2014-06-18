define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/processOfMe/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/processOfMe/collections/WidgetCollection' );
	var Messages        = require( 'text!apps/homepage/external/widgets/external/processOfMe/configuration/messages.json' );

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
		'WidgetId'        : 6,
		'WidgetName'      : function () {
			return message.processOfMeTitle;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return message.processOfMeDescription;
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
			return message.processOfMeEmptyMsg;
		},
		'EmptyType'       : function () {
			return 'fa-video-camera';
		},
		'_footer'         : function () {
			return message.processOfMeFooter;
		}
	} );
} );
