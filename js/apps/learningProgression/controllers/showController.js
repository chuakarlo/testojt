define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );

	App.module( 'LearningProgression.Show', function ( Show ) {

		Show.BaseController = Marionette.Controller.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.listenTo( this.layout, 'close', function () {
					this.close();
				} );
			}

		} );

		Show.ContentController = Show.BaseController.extend( {

			'showLearningProgession' : function () {
				var pd360Loaded = App.request( 'pd360:loaded' );

				this.layout.loading.show( new App.Common.LoadingView() );

				App.when( pd360Loaded ).done( function () {

					this.layout.loading.close();
					App.request( 'pd360:navigate', 'commonCore', 'commonCoreLearningProgression' );

				}.bind( this ) );
			}

		} );

	} );

} );
