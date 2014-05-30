define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var Vent       = require( 'Vent' );

	var template   = require( 'text!../templates/contentNavigationCustomCategoryItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'ui' : {
			'category' : '.cn-custom-category-item'
		},

		'events' : {
			'click @ui.category' : 'changeCategory'
		},

		'onRender' : function () {
			if ( this.model.get( 'isLibrary' ) ) {
				$( this.ui.category ).addClass( 'cn-custom-library' );
				$( this.$el ).addClass( 'cn-custom-library' );
			} else {
				$( this.ui.category ).addClass( 'cn-custom-category' );
				$( this.$el ).addClass( 'cn-custom-category' );
			}
		},

		'changeCategory' : function () {

			if ( this.model.get( 'isCategory' ) ) {
				if ( this.$el.hasClass( 'cn-custom-category' ) ) {
					this.$el.parent().children( 'li' ).removeClass( 'selected' );
					this.$el.addClass( 'selected' );
				}
				Vent.trigger( 'contentNavigation:resetBodyScroll' );
				Vent.trigger( 'contentNavigation:uuv:changeCategory', this.model.get( 'ContentName' ) );
			}
		}

	} );

} );
