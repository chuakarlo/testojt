define( function ( require ) {
	'use strict';

	var Vent            = require( 'Vent' );
	var $               = require( 'jquery' );
	var _               = require( 'underscore' );
	var Marionette      = require( 'marionette' );
	var template        = require( 'text!../templates/contentNavigationLayout.html' );
	var scrollFocusLock = require( 'common/helpers/scrollFocusLock' );

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
			'sidebarWrapper' : '.cn-sidebar-wrapper'
		},

		'events' : {
			'click @ui.sidebarShow' : 'sidebarShow',
			'click @ui.sidebarHide' : 'sidebarHide'
		},

		'sidebarShow' : function () {
			this.ui.sidebar.addClass( 'sidebar-open' ).removeClass( 'hidden-xs' );
			$( '.navbar-brand' ).addClass( 'non-clickable' );
		},

		'sidebarHide' : function () {
			this.ui.sidebar.removeClass( 'sidebar-open' ).addClass( 'hidden-xs' );

			setTimeout( function () {
				$( '.navbar-brand' ).removeClass( 'non-clickable' );
			}, 500 );
		},

		'onShow' : function () {
			var timer = null;

			this.reloadSidebar();

			scrollFocusLock( this.ui.sidebar );

			$( window ).on( 'resize scroll' ,function ( ) {
				clearTimeout( timer );
				timer = setTimeout( function () {
					this.reloadSidebar();
					this.setStickyFilterToggle();
				}.bind( this ), 100 );
			}.bind( this ) );

			this.listenTo( Vent, 'contentNavigation:resetBodyScroll', function () {
				this.resetBodyScroll();
			}.bind( this ) );
		},

		'onClose' : function () {
			scrollFocusLock( this.ui.sidebar , 'destroy' );
			$( window ).off( 'resize scroll' );
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
				this.ui.sidebar.css( 'height', '100%' );
			}
		},

		'setSidebarHeightLandscape' : function () {
			if ( $( window ).scrollTop() > 0 ) {
				this.ui.sidebar.css( 'height', $( window ).height() - 25 );
			} else {
				this.ui.sidebar.css( 'height', $( window ).height() - 200 );
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
