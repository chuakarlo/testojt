define( function ( require ) {
	'use strict';

	var Vent       = require( 'Vent' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/contentNavigationLayout.html' );

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
			'sidebarShow'    : '.cn-sidebar-show',
			'sidebarHide'    : 'span[id=cn-sidebar-hide]',
			'sidebar'        : '.cn-sidebar',
			'sidebarWrapper' : 'div.cn-sidebar-wrapper'
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
			var delay = null;
			var timer = null;

			this.updateSidebarScroll();

			delay = setTimeout( function () {
				this.reloadSidebar();
			}.bind( this ) , 500 );

			$( window ).on( 'resize scroll' ,function ( ) {
				clearTimeout( timer );
				timer = setTimeout( function () {
					this.reloadSidebar();
					this.ui.sidebar.perfectScrollbar( 'update' );
				}.bind( this ), 0 );
			}.bind( this ) );

			this.listenTo( Vent, 'contentNavigation:updateScrollbar', function () {
				this.updateSidebarScroll();
			}.bind( this ) );

			this.listenTo( Vent, 'contentNavigation:resetBodyScroll', function () {
				this.resetBodyScroll();
			}.bind( this ) );
		},

		'onClose' : function () {
			this.ui.sidebar.perfectScrollbar( 'destroy' );
			$( window ).off( 'resize scroll');
			this.stopListening();
		},

		'reloadSidebar' : function () {
			this.setSidebarHeight();

			if ( $( window ).width() > 767 ) {
				this.ui.sidebar.affix( { offset : { top : 170, bottom : 0 } } );
			}
		},

		'setSidebarHeight' : function () {
			if ( $( window ).width() > 767 ) {
				if ( $( window ).scrollTop() > 0 ) {
					this.ui.sidebar.css( 'height', $( window ).height() - 20 );
				} else {
					this.ui.sidebar.css( 'height', $( window ).height() - 200 );
				}
			} else {
				this.ui.sidebar.css( 'height', $( window ).height() );
			}

		},

		'updateSidebarScroll' : function () {
			if ( this.ui.sidebarWrapper.height() < this.getSidebarHeight() ) {
				this.ui.sidebar.perfectScrollbar( 'destroy' );
			} else {
				this.ui.sidebar.perfectScrollbar( { suppressScrollX : true } );
			}
		},

		'resetBodyScroll' : function () {
			$( window ).scrollTop( 0 );

			if ( this.ui.sidebar.hasClass( 'affix' ) ) {
				this.ui.sidebar.removeClass( 'affix' ).addClass( 'affix-top' );
			}

			if ( this.ui.sidebar.hasClass( 'affix-bottom' ) ) {
				this.ui.sidebar.removeClass( 'affix-bottom' ).addClass( 'affix-top' );
			}
		},

		'getSidebarHeight' : function () {
			return this.ui.sidebar.height();
		}

	} );

} );
