define( function( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	return Marionette.ItemView.extend( {

		'tagName' : 'img',

		'template' : _.template(''),

		'onRender' : function() {
			this.$el.prop( 'src', this.model.get( 'BrandingImage' ) );
		}

	} );
} );
