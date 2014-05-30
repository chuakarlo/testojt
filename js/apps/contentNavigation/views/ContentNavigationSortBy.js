define( function ( require ) {
	'use strict';
	var _            = require( 'underscore' );
	var Marionette   = require( 'marionette' );
	var $            = require( 'jquery' );
	var SortItemView = require( '../views/ContentNavigationSortItemView' );
	var template     = require( 'text!../templates/contentNavigationSortByView.html' );

	return Marionette.CompositeView.extend( {

		'template' : _.template( template ),

		'itemView' : SortItemView,

		'itemViewContainer' : '.cn-content-filter',

		'onShow' : function () {
			$( this.$el ).find( 'li:nth-child( 1 )' ).addClass( 'selected' );
		}

	} );

} );
