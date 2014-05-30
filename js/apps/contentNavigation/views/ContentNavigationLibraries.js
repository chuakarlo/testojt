define( function ( require ) {
	'use strict';
	var _               = require( 'underscore' );
	var Marionette      = require( 'marionette' );
	var LibraryItemView = require( '../views/ContentNavigationLibraryItemView' );
	var template        = require( 'text!../templates/contentNavigationLibrariesView.html' );
	var $               = require( 'jquery' );

	return Marionette.CompositeView.extend( {

		'template' : _.template( template ),

		'itemView' : LibraryItemView,

		'itemViewContainer' : 'ul',

		'onShow' : function () {
			$( this.$el ).find( 'li:nth-child( 1 )' ).addClass( 'selected' );
		}

	} );

} );
