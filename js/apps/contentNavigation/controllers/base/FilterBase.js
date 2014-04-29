// ## Manages f/e logic for the application
define( function ( require ) {
	'use strict';

	var $     = require( 'jquery' );
	var _     = require( 'underscore' );
	var Utils = require( '../UtilitiesController' );
	require( 'jquery.pscrollbar' );

	var views = {
		'ErrorView'           : require( '../../views/ErrorView' ),
		'FilterContainerView' : require( '../../views/Filters/FilterContainerView' )
	};

	var FilterControllerMixin = {

		'components'      : { },
		'selectedFilters' : [ ],
		'view'            : null,
		'vent'            : null,

		'initializeComponent' : function ( ) {
			this.view = new views.FilterContainerView();

			this.view.on( 'show', function ( ) {
				this.getCustomContentCategories( );

				this._setFilterScroll(	);

				Utils.scrollIndicator.init( {
					'scrollingEl' : $( '#cn-left-region' ),
					'boxShadowEl' : $( '#cn-filter-shadow' )
				} );

			}.bind( this ) );

			this.view.on( 'close' , function ( view ) {
				this._destroyFilterScroll( $( '#cn-left-region' ) );
			}.bind( this ) );

		},

		'getView' : function () {
			return this.view;
		},

		'addFilterComponent' : function ( name, component ) {
			component.getView().render();
			this.view.$el.append( component.view.$el );
			this.components[ name ] = component;
		},

		'_createVents' : function ( options ) {
			this.vent = options.vent;

			// Request Response
			this.vent.mediator.on( 'filter:change', this._filterChanged, this );
			this.vent.mediator.on( 'scroll:hideShowScroll', this._hideShowFilterScroll, this );
		},

		'_buildFilters' : function () {
			var _selectedFilters = [ ];

			_.each( this.components, function ( cmp ) {
				_selectedFilters.push( cmp.getSelectedFilters() );
			} );

			this.selectedFilters = _.flatten( _selectedFilters );
		},

		'_filterChanged' : function () {
			this._buildFilters();
			this.vent.mediator.trigger( 'segment:filter', this.selectedFilters );
		},

		'_setFilterHeight' : function ( height ) {
			var newHeight = height;
			var delay     = null ;
			var el        = $( '#cn-left-region' );

			el.height( newHeight );

			$( window ).on( 'resize' ,function ( ) {

				clearTimeout( delay );
				delay = setTimeout( function ( ) {

					var filterHeight = this._getFilterHeight();

					el.height( filterHeight );
					el.scrollTop( 0 );
					this._updateFilterScroll( el );

				}.bind( this ), 0 );

			}.bind( this ) );
		},

		'_getFilterHeight' : function () {
			var windowHeight = $( window ).height();
			var allowance    = 85;
			var headerHeight = $( '#cn-header-content' ).height() + $( '#navbar' ).height() + allowance;

			return parseInt( windowHeight - headerHeight, 10 );
		},

		'_setFilterScroll' : function () {
			this._setFilterHeight( this._getFilterHeight() );

			if( $( '#cn-left-region' ).length ) {
				$( '#cn-left-region' ).perfectScrollbar( {
					'minScrollbarLength' : 20,
					'wheelPropagation'   : false
		        } );
			}
		},

		'_hideShowFilterScroll' : function ( origHeight ) {

			var el = $( '#cn-left-region' );

			if ( origHeight < el.height() ){
				this._destroyFilterScroll( el );
			}
			else {
				this._updateFilterScroll( el );
			}
		},

		'_updateFilterScroll' : function ( el ) {
			el.perfectScrollbar( 'update' );
		},

		'_destroyFilterScroll' : function ( el ) {
			el.perfectScrollbar( 'destroy' );
		}
	};

	return FilterControllerMixin;
} );