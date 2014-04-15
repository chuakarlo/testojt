define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/what-to-do-next/external/group-activity/templates/widgetItemView.html' );


	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding groupactivity',
		'templateHelpers' : function () {
			return {
				'content' : this.model.get( 'content' ),
				'type'    : this.model.get('type'),
				'url'     : this.model.get('url'),
				'imgIcon' : this.model.get('imgIcon')
			};
		},
		'onShow' : function ( parent ) {
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