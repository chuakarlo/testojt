define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/external/widgets/external/yourProfile/templates/widgetItemView.html' );
	var $          = require( 'jquery' );

	var getConfig  = require( 'common/helpers/getConfig' );

	var widgetDirectory = 'settings/';

	var message = App.Homepage.Utils.message;

	var forcedCss = {
		'width'  : '1em',
		'height' : '1em'
	};

	var customProgressCircle = {
		'showPercentText' : true,
		'circleSize'      : 90,
		'thickness'       : 3
	};

	function defaultImage ( e ) {
		if ( $( e.currentTarget ).attr( 'src' ).split( '/' ).pop() !== 'default.png' ) {
			$( e.currentTarget ).attr( 'src', getConfig( 'profileAvatarWebPath' ) + 'default.png' );
		}
	}

	function renderAvatar ( avatarImg ) {
		avatarImg.error( defaultImage );
		avatarImg.attr( 'src', avatarImg.attr( 'data-src' ) );
	}

	function renderCircle ( element ) {
		var eCircle  = element.find( '#your-profile-circle' );
		var nPercent = parseInt( eCircle.html(), 10 );
		eCircle.html( '' );

		if ( isNaN( nPercent ) ) {
			nPercent = 25;
		}

		App.Homepage.Utils.progressCircle( element, '#your-profile-circle', nPercent, customProgressCircle, function ( $ ) {
			$( eCircle ).find( '.fill, .bar' ).css( forcedCss );
		} );
	}

	function checkAttribute ( attr ) {
		return attr === '' || attr === 'default.png' || attr === 0 || attr === '0001-01-01';
	}

	return Marionette.ItemView.extend( {
		'events'          : {
			'click a#profile-icon' : 'redirect',
			'click a#setting-icon' : 'redirect',
			'click a#license-icon' : 'redirect'
		},
		'template'        : _.template( template ),
		'className'       : 'col-md-12 no-padding user-settings',
		'templateHelpers' : function ( ) {
			var percentage = this.getPercentage( this.model.attributes );

			var statusDescription = {
				false : message.statusDescfalse,
				true  : message.statusDesctrue
			};

			return {
				'description'                : statusDescription[ percentage > 99 ],
				'percentage'                 : percentage,
				'yourProfileName'            : message.yourProfileName,
				'yourProfilePersonalRepName' : message.yourProfilePersonalRepName,
				'yourProfileLicenses'        : message.yourProfileLicenses
			};
		},
		'getPercentage'   : function ( m ) {
			var keys = Object.keys( m );
			return ( 1 - $.grep( keys, function ( n, i ) {
				return checkAttribute( m[ n ] );
			} ).length / keys.length ) * 100;
		},
		'onRender'        : function () {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				var element = this.$el;
				renderCircle( element );
				renderAvatar( element.find( '#avatarSrc' ) );
			}
		},
		'redirect'        : function ( e ) {
			App.Homepage.Utils.redirect( e, widgetDirectory );
			return false;
		}
	} );
} );
