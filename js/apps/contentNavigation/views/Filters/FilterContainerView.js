define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	require( 'jquery.pscrollbar' );

	var Modernizr = window.Modernizr;
	var Utils     = require( '../../controllers/UtilitiesController' );
	var template  = require( 'text!../../templates/Filters/FilterContainerViewTemplate.html' );

	return Marionette.ItemView.extend( {
		'className' : 'cn-filters-container',
		'tagName'   : 'div',
		'template'  : _.template( template ),

		'onShow' : function () {
			this._setFilterScroll();

			Utils.scrollIndicator.init( {
				'scrollingEl' : $( '#cn-left-region' ),
				'boxShadowEl' : $( '#cn-filter-shadow' )
			} );
		},

		'_toggleFilter' :  function () {
			$( '.sidebar-toggle' ).click( function () {
				$( '.cn-sidebar-content' ).addClass( 'sidebar-open' );
				$( '.sidebar-close-btn' ).show();

				$( '#cn-left-region' ).animate( {
					marginLeft : '0'
				}, 100, function (){
					this._setFilterHeight( $(window).height());
				}.bind( this ) );

			} );

			$( '.sidebar-close-btn' ).click( function () {
				var el = $( this );

				$( '#cn-left-region' ).animate( {
					marginLeft : '-250px'
				}, 100, function () {
					$( '.cn-sidebar-content' ).removeClass( 'sidebar-open' );

					el.hide();
				} );
			} );
		},

		'_setFilterHeight' : function ( height ) {
			var newHeight = height;
			var delay     = null ;

			$( '#cn-left-region' ).height( newHeight );

			$( window ).on( 'resize' ,function () {
				clearTimeout( delay );

				delay = setTimeout( function () {
					var filterHeight = this._getFilterHeight();
					var resizeHeight = ( Modernizr.mq( '( max-width : 767px )' ) ) ?  $( this ).height() : filterHeight ;

					$( '#cn-left-region' ).height( resizeHeight );
					$( '#cn-left-region' ).scrollTop( 0 );
					$( '#cn-left-region' ).perfectScrollbar( 'update' );

				}.bind( this ), 0 );
			}.bind( this ) );
		},

		'_getFilterHeight' : function () {
			var windowHeight = $( window ).height();
			var headerHeight = $( '#cn-header-content' ).height();

			return parseInt( windowHeight - headerHeight );
		},

		'_setFilterScroll' : function () {
			this._setFilterHeight( this._getFilterHeight() );

			$( '#cn-left-region' ).perfectScrollbar( {
				minScrollbarLength: 20,
				wheelPropagation: ( Modernizr.mq( '( max-width : 767px )' ) ) ?  false  : true
	        } );

		   this._toggleFilter();
		}

	} );

} );