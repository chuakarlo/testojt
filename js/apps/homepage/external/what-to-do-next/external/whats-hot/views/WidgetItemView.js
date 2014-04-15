define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/what-to-do-next/external/whats-hot/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding whatshot',
		'templateHelpers' : function () {
			return {
				'content' : this.model.get( 'title' ),
				'url'     : this.model.get( 'url' ),
				'imgUrl'  : this.model.get( 'imgUrl' )
			};
		},

		'onShow'          : function ( parent ) {
			var that = this;
			require( ['pc-htmlconcat'], function ( $ ) {
				$(that.$el).find( 'p' ).htmlconcat( {
					'length'       : 32,
					'stringAppend' : '...'
				} );
			} );

		}
	} );
} );