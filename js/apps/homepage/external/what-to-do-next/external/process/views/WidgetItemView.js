define( function ( require ) {
	'use strict';

	var Marionette       = require( 'marionette' );
	var _                = require( 'underscore' );
	var processTemplate = require( 'text!apps/homepage/external/what-to-do-next/external/process/templates/progressItemTemplate.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( processTemplate ),
		'className'       : 'item learningTarget',
		'templateHelpers' : function () {
			var date = this.formatDate(this.model.get( 'date' ));
			return {
				'content'    : this.model.get( 'content' ),
				'completion' : this.model.get( 'completion' ),
				'date'       : date
			};
		},
		'formatDate' : function ( time ) {
				var _date = new Date( time ).getTime();
				var _time = new Date( _date );

			return _time.toLocaleDateString();
		},
		'onShow' : function ( parent ) {
			var completion = this.model.get( 'completion' );
			var that = this;
			if ( completion ) {
				require( [ 'pc-progressCircle' ], function ( $ ) {
					$( that.$el ).find( 'a' ).progressCircle( {
						'nPercent'        : completion,
						'circleSize'      : 25,
						'thickness'       : 4,
						'showPercentText' : false
					} );
				} );
			}

			require( ['pc-htmlconcat'], function ( $ ) {
				$(that.$el).find( 'p' ).htmlconcat( {
					'length'       : 40,
					'stringAppend' : '...'
				} );
			} );
		}
	} );
} );