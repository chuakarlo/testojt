define( function ( require ) {
	'use strict';

	var Marionette      = require( 'marionette' );
	var _               = require( 'underscore' );
	var template        = require( 'text!apps/homepage/external/widgets/external/yourProfile/templates/widgetItemView.html' );

	return Marionette.ItemView.extend( {
		'template'          : _.template( template ),
		'className'         : 'col-md-12 no-padding',
		'templateHelpers'   : function ( ) {
			return {
				'avatar'      : this.getAvatarWithLink( this.model.attributes.Avatar ),
				'description' : this.getDescription( this.getPercentage( this.model ) ),
				'percentage'  : this.getPercentage( this.model )
			};
		},
		'getAvatarWithLink' : function ( a ) {
			var podUrl = 'http://resources.pd360.com/PD360/uploads/avatars/profile/';
			return podUrl + a;
		},
		'getDescription'    : function ( d ) {
			var Description = 'Your profile is almost complete! The more we know about you, the better the content.';
			if ( d > 99 ) {
				Description = 'Your profile is complete!';
			}
			return Description;
		},
		'getPercentage'     : function ( m ) {
			var cntEmpty = 0;
			var kCount   = 0;
			for ( var k in m.attributes ) {
				kCount++;
				if ( m.attributes[k] === '' ) {
					cntEmpty++;
				}
			}
			var countNonEmpty     = kCount - cntEmpty;
			var percentageDecimal = countNonEmpty / kCount;
			var resultPercent     = percentageDecimal * 100;
			return ( resultPercent );
		},
		'onRender'          : function ( parent ) {
			var eCircle  = parent.$( '#your-profile-circle' );
			var nPercent = parseInt( eCircle.html(), 10 );
			eCircle.html( '' );

			if ( isNaN( nPercent ) ) {
				nPercent = 25;
			}

			require( [ 'pc-progressCircle' ], function ( $ ) {
				$(eCircle).progressCircle( {
					'nPercent'        : nPercent,
					'showPercentText' : true,
					'circleSize'      : 80,
					'thickness'       : 2
				} );

				$(eCircle).find( '.fill' )
					.css( 'width', '0.99em' )
					.css( 'height', '0.99em' );
			} );
		}
	} );
} );
