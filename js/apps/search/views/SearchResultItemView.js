define( function( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	return Marionette.ItemView.extend( {
		
		'tagName'   : 'li',
		'className' : 'col-xs-12 col-sm-6 col-md-4 col-lg-3',

		'onRender' :  function() {
			this.$el.fadeIn( 'normal' );
		},

		'shortenTitle' : function( title ) {
			if ( title && title.length > 43 ) {
				return title.substr( 0, 40 ) + '...';
			}
			return title;
		}
	} );
} );