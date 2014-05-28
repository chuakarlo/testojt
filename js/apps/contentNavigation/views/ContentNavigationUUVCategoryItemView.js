define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var template   = require( 'text!../templates/contentNavigationUUVCategoryItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName'  : 'li',
		'template' : _.template( template ),
		'ui'       : {
			'category' : '.cn-uuv-category-item'
		},

		'events' : {
			'click @ui.category' : 'changeCategory'
		},

		'changeCategory' : function () {
			Vent.trigger( 'contentNavigation:uuv:changeCategory', this.model );

			setTimeout( function () {
				this.$el.parent().children( 'li' ).removeClass( 'selected' );
				this.$el.addClass( 'selected' );
			}.bind( this ) );
		}

	} );

} );
