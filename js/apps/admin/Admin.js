define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	var AuthRouter  = require( 'AuthRouter' );
	var AdminLayout = require( 'admin/views/AdminLayout' );

	require( 'admin/controllers/showController' );
	require( 'admin/entities/OnDemand' );
	require( 'admin/entities/Sinet' );
	require( 'admin/entities/ToolTypes' );

	App.module( 'Admin', function ( Admin ) {

		Admin.Router = AuthRouter.extend( {

			'appRoutes' : {
				'admin' : 'showAdmin'
			}

		} );

		var AdminController = Marionette.Controller.extend( {

			'showAdmin' : function () {
				if ( !this.layout ) {
					this.layout = new AdminLayout();
					App.content.show( this.layout );

					this.listenTo( this.layout, 'close', this.destroyControllers );
				}

				if ( !this.contentController ) {
					this.contentController = new Admin.Show.ContentController( {
						'layout' : this.layout
					} );
				}

				this.contentController.showPage();

			},

			'destroyControllers' : function () {
				this.contentController = null;
				this.navController     = null;
				this.layout            = null;
			}

		} );

		App.addInitializer( function () {
			new Admin.Router( {
				'controller' : new AdminController()
			} );
		} );

	} );

} );
