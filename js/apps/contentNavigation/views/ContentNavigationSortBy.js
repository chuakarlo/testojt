define( function ( require ) {
	'use strict';
	var _            = require( 'underscore' );
	var Marionette   = require( 'marionette' );
	var $            = require( 'jquery' );
	var SortItemView = require( '../views/ContentNavigationSortItemView' );
	var template     = require( 'text!../templates/contentNavigationSortByView.html' );
	var Vent         = require( 'Vent' );

	return Marionette.CompositeView.extend( {

		'initialize' : function () {
			this.listenTo( Vent, 'contentNavigation:updateRelevance', function ( enable ) {
				this.updateRelevance( enable );
			} );
		},

		'template' : _.template( template ),

		'itemView' : SortItemView,

		'itemViewContainer' : '.cn-content-filter',

		'onShow' : function () {
			$( this.$el ).find( 'li:nth-child( 1 ) > .cn-sort-item' ).addClass( 'cn-disabled cn-relevance' );
			$( this.$el ).find( 'li:nth-child( 2 )' ).addClass( 'selected' );
		},

		'updateRelevance' : function ( enable ) {
			if ( enable ) {
				$( this.$el ).find( 'li.selected' ).removeClass( 'selected' );
				$( this.$el ).find( 'li:nth-child( 1 )' ).addClass( 'selected' );
				$( this.$el ).find( '.cn-relevance' ).removeClass( 'cn-disabled' );
			}

			if ( !enable ) {
				$( this.$el ).find( 'li.selected' ).removeClass( 'selected' );
				$( this.$el ).find( 'li:nth-child( 2 )' ).addClass( 'selected' );
				$( this.$el ).find( '.cn-relevance' ).addClass( 'cn-disabled' );
			}
		}

	} );

} );
