define( function ( require ) {
	'use strict';

	var Marionette     = require( 'marionette' );
	var _              = require( 'underscore' );
	var template       = require( 'text!apps/homepage/external/what-to-do-next/external/your-profile/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'        : _.template( template ),
		'className'       : 'item your-profile',
		'templateHelpers' : function () {
			return {
				'description' : this.model.get( 'description' ),
				'percentage'  : this.model.get( 'percentage' )
			};
		},

		'onRender' : function ( parent ) {
			var eCircle  = parent.$( '#your-profile-circle' );
			var nPercent = parseInt( eCircle.html(), 10 );
			eCircle.html( '' );

			if( isNaN( nPercent ) ) {
				nPercent = 25;
			}

			require( [ 'pc-progressCircle' ], function ( $ ) {
				$(eCircle).progressCircle( {
					'nPercent' : nPercent
				} );
			} );
		}
	} );
} );