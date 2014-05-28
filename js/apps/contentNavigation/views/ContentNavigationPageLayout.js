define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template = require( 'text!../templates/contentNavigationLayout.html' );

	return Marionette.Layout.extend( {

		'tagName' : 'section',

		'id' : 'content-navigation-page',

		'template' : _.template( template ),

		'regions' : {
			'librariesRegion' : '#cn-libraries',
			'filtersRegion'   : '#cn-filters',
			'segmentsRegion'  : '#cn-contents',
			'loadingRegion'   : '#cn-loading',
			'sortByRegion'    : '#cn-sortby'
		},

		'ui' : {
			'sidebarShow' : 'div[id=test]',
			'sidebarHide' : 'span[id=cn-sidebar-hide]',
			'sidebar'     : '.cn-sidebar'
		},

		'events' : {
			'click @ui.sidebarShow' : 'sidebarShow',
			'click @ui.sidebarHide' : 'sidebarHide'
		},

		'sidebarShow' : function ( ev ) {
			ev.preventDefault();
			$( 'body' ).addClass( 'disable-scroll' );
			this.ui.sidebar.addClass( 'sidebar-open' ).removeClass( 'hidden-xs' );

		},

		'sidebarHide' : function ( ev ) {
			ev.preventDefault();
			$( 'body' ).removeClass( 'disable-scroll' );
			this.$el.find( '.cn-sidebar' ).removeClass( 'sidebar-open' ).addClass( 'hidden-xs' );
		},

		'onShow' : function ( ) {

			this.ui.sidebar.perfectScrollbar( { suppressScrollX : true } );
			setTimeout( function () {
				this.reloadSidebar();
			}.bind( this ) );
			$( window ).on( 'resize' ,function ( ) {
				this.reloadSidebar();
			}.bind( this ) );

		},

		'onClose' : function () {
			this.ui.sidebar.perfectScrollbar( 'destroy' );
		},

		'reloadSidebar' : function () {
			this.setSidebarHeight();
			this.ui.sidebar.perfectScrollbar( 'update' );
			if ( $( window ).width() > 767 ) {
				this.ui.sidebar.affix( { offset : { top : 170, bottom : 90 } } );
			}
		},

		'setSidebarHeight' : function () {
			if ( $( window ).width() > 767 ) {
				this.ui.sidebar.css( 'height', $( window ).height() - 90 );
			} else {
				this.ui.sidebar.css( 'height', $( window ).height() );
			}

		},

		'getSidebarHeight' : function () {
			return this.ui.sidebar.height();
		}

	} );

} );
