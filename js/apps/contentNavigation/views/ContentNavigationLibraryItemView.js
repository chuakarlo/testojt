define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	var template   = require( 'text!../templates/contentNavigationLibraryItemView.html' );

	return Marionette.ItemView.extend( {

		'tagName'   : 'li',
		'template'  : _.template( template ),
		'ui'        : {
			'item' : '.cn-library-item'
		},
		'events' : {
			'click @ui.item' : 'switchLibrary'
		},

		'switchLibrary' : function () {

			if ( this.model.get( 'LibraryType' ) === 'pd360' ) {
				Vent.trigger( 'contentNavigation:switchLibrary', this.model, true );
			} else {
				Vent.trigger( 'contentNavigation:switchLibrary', this.model );
			}

			setTimeout( function () {
				this.$el.parent().children( 'li' ).removeClass( 'selected' );
				this.$el.addClass( 'selected' );
			}.bind( this ) );

		}

	} );

} );
