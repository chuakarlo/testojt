define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );
	var template   = require( 'text!../templates/contentNavigationCustomCategoryItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName' : 'li',

		'template' : _.template( template ),

		'ui' : {
			'category'      : '.cn-custom-category-item',
			'customLibrary' : '.cn-custom-library'
		},

		'events' : {
			'click @ui.category'      : 'changeCategory',
			'click @ui.customLibrary' : 'changeLibrary'
		},

		'onRender' : function () {

			if ( this.model.get( 'isLibrary' ) ) {
				$( this.ui.category ).addClass( 'cn-custom-library' );
				$( this.$el ).addClass( 'cn-custom-library' );
			} else {
				$( this.ui.category ).addClass( 'cn-custom-category' );
				$( this.$el ).addClass( 'cn-custom-category' + ' ' + this.model.get( 'parentId' ) );
			}
		},

		'onShow' : function () {
			if ( this.model.get( 'isLibrary' ) ) {
				var className = $( 'li.cn-custom-category:nth-child(2)' ).attr( 'class' );

				$( 'li.cn-custom-category' ).hide();
				$( '.' + className.substr( className.indexOf(' ') + 1 ) ).toggle();
			}
		},

		'changeLibrary' : function () {
			$( 'li.cn-custom-category' ).hide();
			$( '.' + this.model.get( 'ContentId' ) ).toggle();
		},

		'changeCategory' : function () {

			var hasPendingRequest = App.request( 'contentNavigation:hasPendingRequest' );

			if ( hasPendingRequest || this.$el.hasClass( 'selected' ) ) {
				return;
			}

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
