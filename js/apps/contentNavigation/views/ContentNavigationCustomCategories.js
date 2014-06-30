define( function ( require ) {
	'use strict';

	var Vent             = require( 'Vent' );
	var $                = require( 'jquery' );
	var _                = require( 'underscore' );
	var Marionette       = require( 'marionette' );
	var CategoryItemView = require( '../views/ContentNavigationCustomCategoryItemView' );
	var template         = require( 'text!../templates/contentNavigationCustomCategoriesView.html' );

	require( 'jquery.mousewheel' );
	require( 'jquery.pscrollbar' );

	return Marionette.CompositeView.extend( {

		'template' : _.template( template ),

		'itemView' : CategoryItemView,

		'itemViewContainer' : '.cn-content-filter',

		'onShow' : function () {
			$( this.$el ).find( 'li:nth-child( 2 )' ).addClass( 'selected' );

			Vent.trigger( 'contentNavigation:updateScrollbar' );
		},

		'onClose' : function () {
			this.ui.sidebar.perfectScrollbar( 'destroy' );
		},

		'ui' : {
			'collapseButton' : '.cn-collapse',
			'sidebar'        : '.cn-sidebar'
		},

		'events' : {
			'click @ui.collapseButton' : 'toggleFilter'
		},

		'toggleFilter' : function ( ev ) {
			if ( $( ev.currentTarget ).hasClass( 'open' ) ) {
				$( ev.currentTarget  ).removeClass( 'open' ).children( '.fa' ).removeClass( 'fa-minus' ).addClass( 'fa-plus' );
				$( 'div.cn-filter-container' ).hide();
			} else {
				$( ev.currentTarget  ).addClass( 'open' ).children( '.fa' ).removeClass( 'fa-plus' ).addClass( 'fa-minus' );
				$( 'div.cn-filter-container' ).show();
			}

			Vent.trigger( 'contentNavigation:updateScrollbar' );
		}

	} );

} );
