define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/content/templates/emptyContentCollectionView.html' );

	var css = {
		'margin'  : '0px',
		'padding' : '100px'
	};

	return Marionette.ItemView.extend( {

		'initialize' : function ( options ) {
			this.$el.css( css );
		},

		'tagName'   : 'li',
		'className' : 'row show-grid text-center',
		'template'  : _.template( template )
	} );
} );