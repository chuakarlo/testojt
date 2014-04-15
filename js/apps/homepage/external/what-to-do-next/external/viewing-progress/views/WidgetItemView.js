define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var progressTemplate = require( 'text!apps/homepage/external/what-to-do-next/external/viewing-progress/templates/progressItemTemplate.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( progressTemplate ),
		'className'       : 'col-md-12 no-padding learningTarget',
		'templateHelpers' : function () {
			var date = this.model.get( 'date' );
			return {
				'content'    : this.model.get( 'content' ),
				'completion' : this.model.get( 'completion' ),
				'date'       : date
			};
		},
		'onShow' : function ( parent ) {
			var completion = this.model.get( 'completion' );
			var that = this;
			if ( completion ) {
				require( [ 'pc-progressCircle' ], function ( $ ) {
					$(that.$el).find( 'a' ).progressCircle( {
						'nPercent'        : completion,
						'circleSize'      : 25,
						'thickness'       : 4,
						'showPercentText' : false
					} );
				} );
			}
			require( ['pc-htmlconcat'], function ( $ ) {
				$(that.$el).find( 'p' ).htmlconcat( {
					'length'       : 32,
					'stringAppend' : '...'
				} );
			} );
		}
	} );
} );