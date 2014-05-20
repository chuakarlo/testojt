define( function ( require ) {
	'use strict';

	return function () {

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

					// check if pd360 is loaded
					var pd360Loaded = App.request( 'pd360:loaded' );

					// show a loading view while we wait
					App.content.show( new App.Common.LoadingView() );

					App.when( pd360Loaded ).done( function () {
						//close loading
						App.content.close();

						// if `requestArgs` are empty, will display the lumibook bookshelf
						App.request( 'pd360:navigate', 'liveBook', '', requestArgs );
					} );

				}

			};

			App.addInitializer( function () {
				new Mod.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
