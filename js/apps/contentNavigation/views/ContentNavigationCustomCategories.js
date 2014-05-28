define( function ( require ) {
	'use strict';

	var $                = require( 'jquery' );
	var _                = require( 'underscore' );
	var Marionette       = require( 'marionette' );
	var CategoryItemView = require( '../views/ContentNavigationCustomCategoryItemView' );
	var template         = require( 'text!../templates/contentNavigationCustomCategoriesView.html' );

	return Marionette.CompositeView.extend( {

		'template'  : _.template( template ),
		'itemView'  : CategoryItemView,
		'tagName'   : 'ul',
		'className' : 'cn-content-filter nested-list',
		'onShow'    : function () {

			$( this.$el ).find( 'li:nth-child( 2 )' ).addClass( 'selected' );
		}

	} );

} );
