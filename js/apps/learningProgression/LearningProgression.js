define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );

	var LearningProgressionLayout = require( 'learningProgression/views/LearningProgressionLayout' );

	require( 'learningProgression/controllers/showController' );

	App.module( 'LearningProgression', function ( LearningProgression ) {

		var Router = Marionette.AppRouter.extend( {

			'appRoutes' : {
				'resources/learningProgression' : 'showLearningProgession'
			}

		} );

		var Controller = Marionette.Controller.extend( {

			'showLearningProgession' : function () {
				if ( !this.layout ) {
					this.layout = new LearningProgressionLayout();
					App.content.show( this.layout );

					this.listenTo( this.layout, 'close', this.destroyControllers );
				}

				if ( !this.contentController ) {
					this.contentController = new LearningProgression.Show.ContentController( {
						'layout' : this.layout
					} );
				}

				this.contentController.showLearningProgession();
			},

			'destroyControllers' : function () {
				this.contentController = null;
				this.layout            = null;
			}

		} );

		App.addInitializer( function () {

			new Router( {
				'controller' : new Controller()
			} );

		} );

	} );

} );
