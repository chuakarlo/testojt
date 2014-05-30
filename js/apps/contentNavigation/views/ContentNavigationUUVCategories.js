define( function ( require ) {
	'use strict';
	var _                = require( 'underscore' );
	var Marionette       = require( 'marionette' );
	var $                = require( 'jquery' );
	var CategoryItemView = require( '../views/ContentNavigationUUVCategoryItemView' );
	var template         = require( 'text!../templates/contentNavigationUUVCategoriesView.html' );

	return Marionette.CompositeView.extend( {

		'template' : _.template( template ),

		'itemView' : CategoryItemView,

		'tagName' : 'ul',

		'className' : 'cn-content-filter',

		'onShow' : function () {
			$( this.$el ).find( 'li:nth-child( 2 )' ).addClass( 'selected' );
		}

	} );

} );
