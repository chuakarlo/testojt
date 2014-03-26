define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../../templates/Segments/SegmentItemViewTemplate.html' );

	return Marionette.ItemView.extend( {
		'tagName'   : 'li',
		'className' : 'col-xs-6 col-sm-8 col-md-3',
		'template'  : _.template( template ),

		'ui' : {
			'watchLater' : 'div.cn-watch-later input'
		},

		'onRender': function() {
			this.$el.fadeIn('normal');

			if ( this.model.get( 'inWatchLaterQueue') ) {
				this.$el.find( '.flag' ).attr( 'checked', true );
			}
		}
	} );

} );