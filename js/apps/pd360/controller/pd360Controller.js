define( function ( require ) {
	'use strict';

	var PD360View   = require( '../views/PD360View' );
	var LoadingView = require( '../views/LoadingView' );
	var $           = require( 'jquery' );

	var pending;
	var pd360;

	return function ( Show, App ) {

		var container = $( App.flashContent.el );

		Show.Controller = {

			'embed' : function () {
				if ( !pd360 ) {
					App.flashContent.show( new PD360View() );
					pd360 = $( '#PD360' )[ 0 ];
				}
			},

			'navigate' : function ( main, sub, options ) {
				if ( !pd360 ) {
					pending = {};
					pending.main = main;
					pending.sub = sub;
					pending.options = options;

					App.content.show( new LoadingView() );
					return;
				}

				sub = sub || '';

				pd360.navigateFromContainer( main, sub, options );
			},

			'show' : function () {
				if ( !pending ) {
					container.removeClass( 'hidden-flash' );
				}
			},

			'hide' : function () {
				container.addClass( 'hidden-flash' );
			},

			'applicationComplete' : function () {},

			'loginComplete' : function () {
				if ( pending ) {
					App.content.close();
					this.navigate( pending.main, pending.sub, pending.options );
					pending = null;
					this.show();
				}
			},

			'login' : function ( username, password ) {
				pd360.loginFromContainer( username, password );
			},

			'logout' : function () {
				pd360.logoutFromContainer();
				App.flashContent.close();
				pd360 = null;
			}

		};

	};

} );
