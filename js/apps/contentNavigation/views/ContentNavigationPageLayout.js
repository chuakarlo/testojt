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
			'sidebarHide'    : '.cn-sidebar-hide',
			'sidebar'        : '.cn-sidebar',
			'sidebarWrapper' : 'div.cn-sidebar-wrapper'
		},

		'events' : {
			'click @ui.sidebarShow' : 'sidebarShow',
			'click @ui.sidebarHide' : 'sidebarHide'
		},

		'sidebarShow' : function ( ev ) {
			$( 'html' ).addClass( 'disable-scroll' );
			this.ui.sidebar.addClass( 'sidebar-open' ).removeClass( 'hidden-xs' );
		},

		'sidebarHide' : function ( ev ) {
			$( 'html' ).removeClass( 'disable-scroll' );
			this.ui.sidebar.removeClass( 'sidebar-open' ).addClass( 'hidden-xs' );
		},

		'onShow' : function ( ) {
			var timer = null;

			this.updateSidebarScroll();
			this.reloadSidebar();

			$( window ).on( 'resize scroll' ,function ( ) {
				clearTimeout( timer );
				timer = setTimeout( function () {
					this.reloadSidebar();
					this.updateSidebarScroll();
					this.setStickyFilterToggle();
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
				this.setSidebarHeightLandscape();
			} else {
				this.ui.sidebar.css( 'height', $( window ).height() );
			}

		},

		'setSidebarHeightLandscape' : function () {
			var isiPad = navigator.userAgent.match(/iPad/i);

			if ( $( window ).scrollTop() > 0 ) {
				if ( isiPad && $( window ).width() > 1023 ) {
					this.ui.sidebar.css( 'height', $( window ).height() - 350 );
				} else if ( isiPad && $( window ).width() <= 1023 ) {
					this.ui.sidebar.css( 'height', $( window ).height() - 150 );
				} else {
					this.ui.sidebar.css( 'height', $( window ).height() - 20 );
				}
			} else {
				if ( isiPad && $( window ).width() > 1023 ) {
					this.ui.sidebar.css( 'height', $( window ).height() - 550 );
				} else if ( isiPad && $( window ).width() <= 1023 ) {
					this.ui.sidebar.css( 'height', $( window ).height() - 300 );
				} else {
					this.ui.sidebar.css( 'height', $( window ).height() - 200 );
				}
			}
		},

		'updateSidebarScroll' : function () {
			if ( this.ui.sidebarWrapper.height() < this.getSidebarHeight() || $( window ).width() < 768 ) {
				this.ui.sidebar.perfectScrollbar( 'destroy' );
			} else {
				this.ui.sidebar.perfectScrollbar( { suppressScrollX : true } );
			}
		},

		'resetBodyScroll' : function () {
			$( window ).scrollTop( 0 );

			this.ui.sidebar.addClass( 'affix-top' ).removeClass( 'affix-bottom affix' );
		},

		'getSidebarHeight' : function () {
			return this.ui.sidebar.height();
		},

		'setStickyFilterToggle' : function () {
			if ( $( window ).scrollTop() < 163 ) {
				this.ui.sidebarShow.removeClass( 'sticky' );
			} else {
				this.ui.sidebarShow.addClass( 'sticky' );
			}
		}

	} );

} );
