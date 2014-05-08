define( function ( require ) {

	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!../../templates/Filters/FilterItemViewTemplate.html' );

	return Marionette.ItemView.extend( {

		'tagName'   : 'li',
		'template'  : _.template( template ),
		'className' : 'filter-item',

		'onRender' : function () {
			if ( this.model.id === 'Popular' ) {
				this.$el.addClass( 'addHighlight' ).find( '.filter-tick' ).addClass( 'fa fa-check' );
			}
		}

	} );
} );
