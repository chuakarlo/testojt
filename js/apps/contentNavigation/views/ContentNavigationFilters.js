define( function ( require ) {
	'use strict';

	var Vent           = require( 'Vent' );
	var App            = require( 'App' );
	var _              = require( 'underscore' );
	var Marionette     = require( 'marionette' );
	var $              = require( 'jquery' );
	var FilterItemView = require( '../views/ContentNavigationFilterItemView' );
	var template       = require( 'text!../templates/contentNavigationFiltersView.html' );

	require( 'jquery.mousewheel' );
	require( 'jquery.pscrollbar' );

	return Marionette.CompositeView.extend( {

		'template' : _.template( template ),

		'itemView' : FilterItemView,

		'itemViewContainer' : '.cn-filter-list',

		'className' : 'cn-header-filter',

		'ui' : {
			'clearButton'    : '.cn-clear-btn',
			'filter'         : '.cn-filter-item',
			'collapseButton' : '.cn-collapse',
			'sidebar'        : '.cn-sidebar'
		},

		'events' : {
			'click @ui.clearButton'    : 'clearFilters',
			'click @ui.filter'         : 'changeClear',
			'click @ui.collapseButton' : 'toggleFilter'
		},

		'toggleFilter' : function ( ev ) {
			if ( $( ev.currentTarget ).hasClass( 'open' ) ) {
				$( ev.currentTarget  ).removeClass( 'open' ).children( '.fa' ).removeClass( 'fa-minus' ).addClass( 'fa-plus' );
				$( 'div.cn-filter-container-' + this.options.filterName.toLowerCase() ).hide();
			} else {
				$( ev.currentTarget  ).addClass( 'open' ).children( '.fa' ).removeClass( 'fa-plus' ).addClass( 'fa-minus' );
				$( 'div.cn-filter-container-' + this.options.filterName.toLowerCase() ).show();
			}

			Vent.trigger( 'contentNavigation:updateScrollbar' );
		},

		'changeClear' : function () {
			if ( !this.$el.find( 'li' ).hasClass( 'selected' ) ) {
				this.$el.find( '.cn-clear-btn' ).attr( 'disabled', 'disabled' );
			} else {
				this.$el.find( '.cn-clear-btn' ).removeAttr( 'disabled' );
			}
		},

		'clearFilters' : function ( e ) {
			e.preventDefault();

			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );

			if ( hasPendingRequest ) {
				return;
			}

			this.$el.find( 'li' ).removeClass( 'selected' );
			this.$el.find( '.cn-clear-btn' ).attr( 'disabled', 'disabled' );

			Vent.trigger( 'contentNavigation:resetBodyScroll' );

			Vent.trigger( 'contentNavigation:pd360:clearFilters', this.collection );
		},

		'onBeforeItemAdded' : function ( itemView ) {
			if ( this.options.splitColumn ) {
				var splitTreshold = Math.floor( this.collection.length / 2 );

				var modelIndex = this.collection.indexOf( itemView.model );

				if ( modelIndex >= splitTreshold ) {
					itemView.$el.addClass( 'right' ).css( 'margin-top', ( this.collection.length - modelIndex ) * -30 );
				}
			}
		},

		'onBeforeRender' : function () {
			this.options.split = '';
			if ( this.options.splitColumn ) {
				this.options.split = ' cn-split-filter';
			}

			this.template = _.template( template, this.options );

			return this;
		},

		'onShow' : function () {
			Vent.trigger( 'contentNavigation:updateScrollbar' );
		},

		'onClose' : function () {
			this.ui.sidebar.perfectScrollbar( 'destroy' );
		}

	} );

} );
