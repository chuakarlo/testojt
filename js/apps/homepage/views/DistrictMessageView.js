define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var template   = require( 'text!apps/homepage/templates/DistrictMessageView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'well',

		'ui' : {
			'more'         : '.fake-link',
			'shortMessage' : '.short-district-message',
			'longMessage'  : '.long-district-message'
		},

		'events' : {
			'click @ui.more' : 'toggleMessage'
		},

		'onRender' : function () {
			if ( App.request( 'homepage:isHomeRoute' ) ) {
				this.ui.longMessage.hide();
				if ( this.model.get( 'Message' ).length < 150 ) {
					this.ui.more.hide();
				}
			}
		},

		'toggleMessage' : function () {
			this.ui.longMessage.toggle();
			this.ui.shortMessage.toggle();
			this.ui.more.toggle();
		},

		'shortenMessage' : function () {
			var m = this.model.get( 'Message' );
			if ( m.length > 150 ) {
				return m.substr( 0, 150 ) + '...';
			}
			return m;
		},

		'templateHelpers' : function () {
			var shortMessage = this.shortenMessage();
			return {
				'shortMessage' : function () {
					return shortMessage;
				}
			};
		}

	} );
} );
