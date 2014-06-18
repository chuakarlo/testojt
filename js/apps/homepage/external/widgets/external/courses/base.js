define( function ( require ) {
	'use strict';

	var App             = require( 'App' );
	var BaseObj         = require( 'apps/homepage/BaseObject' );
	var instance        = new BaseObj();
	var WidgetItemView  = require( 'apps/homepage/external/widgets/external/courses/views/WidgetItemView' );
	var CollectionItems = require( 'apps/homepage/external/widgets/external/courses/collections/WidgetCollection' );
	var Messages        = require( 'text!apps/homepage/external/widgets/external/courses/configuration/messages.json' );

	App.Homepage.Utils.loadMessages(Messages);
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
		'WidgetId'        : 1,
		'WidgetName'      : function () {
			return message.coursesTitle;
		},
		'header'          : function () {
			return this.WidgetName();
		},
		'Description'     : function () {
			return message.coursesDescription;
		},
		'imgSrc'          : function () {
			return '/img/src_courses_zps2b594805.png';
		},
		'icon'            : function () {
			return this.imgSrc();
		},
		'em'              : 8.5,
		'getExternalView' : WidgetItemView,
		'getCollection'   : function ( callback, options ) {
			doGetCollection ( callback, options );
		},
		'_id'             : 'courses',
		'_footer'         : function ( ) {
			return message.coursesFooter;
		},
		'EmptyMessage'    : function () {
			return '';
		},
		'EmptyType'       : function () {
			return 'fa-list-ol';
		},
		'_mainUrl'        : 'resources/learning/courses'
	} );
} );
