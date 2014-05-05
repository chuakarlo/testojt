define( function ( require ) {
	'use strict';

	var _   = require( 'underscore' );
	var App = require( 'App' );

	App.module( 'LumiBook', function ( Mod ) {

		var AuthRouter = require( 'AuthRouter' );

		Mod.Router = AuthRouter.extend( {

			'appRoutes' : {
				'resources/lumibook(/:lbid)(/:lbiid)' : 'showLumiBook'
			}

		} );

		var API = {

			'showLumiBook' : function () {
				App.request( 'pd360:navigate', null, 'liveBook' );
				// Args we potentially are going to pass to the flash. These
				// are in expected order of this function's arguments. If the
				// router doesn't get a match for the argument, it passes null
				var options = [
					'LiveBookId',
					'LiveBookItem'
				];

				// The final args we are going to pass to the flash
				var requestArgs = { };

				_.each( arguments, function ( arg ) {
					if ( arg !== null ) {
						requestArgs[ options.shift() ] = arg;
					} else {
						options.shift();
					}
				} );

				// if the arguments are empty, just display the main community
				// page
				if ( _.isEmpty( requestArgs ) ) {
					App.request( 'pd360:navigate', null, 'liveBook', '');
				} else {
					App.request( 'pd360:navigate', null, 'liveBook', '',
						requestArgs );

				}
			}

		};

		App.addInitializer( function () {
			new Mod.Router( {
				'controller' : API
			} );
		} );

	} );

} );
