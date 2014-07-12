define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/focusObjective/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/focusObjective/collections/WidgetCollection' );

	function doGetCollection ( callback, options ) {
		var collection = new CollectionItems( options );

		collection.fetch( {

			'success' : function ( collection ) {
				if ( App.request( 'homepage:isHomeRoute' ) ) {
					callback ( collection );
				}
			},

			'error' : function ( err ) {
				App.errorHandler( new Error( App.Homepage.Utils.message.focusObjectiveErrMsg ) );
			}

		} );
	}

	return instance.extend( {
		'WidgetId'        : 2,
		'WidgetName'      : function () {
			return App.Homepage.Utils.message.focusObjectiveTitle;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return	App.Homepage.Utils.message.focusObjectiveDescription;
		},
		'imgSrc'          : function () {
			return '/img/src_focusObjectives_zpsfa2cacc5.png';
		},
		'icon'            : function () {
			return this.imgSrc();
		},
		'em'              : 7,
		'getExternalView' : WidgetItemView, // items template
		'getCollection'   : function ( callback, options ) {
			doGetCollection( callback, options );
		},
		'_mainUrl'        : 'resources/learning/focus-objectives',
		'_id'             : 'focusObjective',
		'EmptyMessage'    : function () {
			return '';
		},
		'EmptyType'       : function () {
			return 'fa-video-camera';
		},
		'_footer'         : function ( ) {
			return App.Homepage.Utils.message.focusObjectiveFooter;
		}
	} );
} );
