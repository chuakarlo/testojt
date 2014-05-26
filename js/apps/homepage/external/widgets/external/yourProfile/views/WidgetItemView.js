define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/widgets/external/yourProfile/templates/widgetItemView.html' );
	var $          = require( 'jquery' );
	var getConfig  = require( 'common/helpers/getConfig' );

	return Marionette.ItemView.extend( {
		'template'          : _.template( template ),
		'className'         : 'col-md-12 no-padding user-settings',
		'replaceSrc'        : function ( e ) {
			$( e.currentTarget ).attr( 'src', getConfig( 'profileAvatarWebPath' ) + 'default.png' );
		},
		'templateHelpers'   : function ( ) {
			return {
				'avatar'      : this.getAvatarWithLink( this.model.attributes.Avatar ),
				'description' : this.getDescription( this.getPercentage( this.model ) ),
				'percentage'  : this.getPercentage( this.model )
			};
		},
		'getAvatarWithLink' : function ( a ) {
			return getConfig( 'profileAvatarWebPath' ) + a;
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
				if ( m.attributes[ k ] === '' || m.attributes[ k ] === 'default.png' || m.attributes[ k ] === 0 || m.attributes[ k ] === '0001-01-01' ) {
					cntEmpty++;
				}
			}
			var countNonEmpty     = kCount - cntEmpty;
			var percentageDecimal = countNonEmpty / kCount;
			var resultPercent     = percentageDecimal * 100;
			return ( resultPercent );
		},
		'onRender'          : function ( parent ) {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
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
						'circleSize'      : 90,
						'thickness'       : 3
					} );

					$(eCircle).find( '.fill' )
						.css( 'width', '1em' )
						.css( 'height', '1em' );
					$(eCircle).find( '.bar' )
						.css( 'width', '1em' )
						.css( 'height', '1em' );

				} );

				var avatarImg = parent.$( '#avatarSrc' );

				avatarImg.error( function ( e ) {
					$( e.currentTarget ).attr( 'src', getConfig( 'profileAvatarWebPath' ) + 'default.png' );
				});

				avatarImg.attr( 'src', avatarImg.attr( 'data-src' ) );
			}
		}
	} );
} );
