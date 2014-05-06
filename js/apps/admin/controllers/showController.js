define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	var NavView      = require( 'admin/views/Nav' );
	var NonAdminView = require( 'admin/views/NonAdmin' );

	App.module( 'Admin.Show', function ( Mod ) {

		Mod.BaseController = Marionette.Controller.extend( {

			'initialize' : function ( options ) {
				this.layout = options.layout;
				this.listenTo( this.layout, 'close', function () {
					this.close();
				} );
			}

		} );

		Mod.ContentController = Mod.BaseController.extend( {

			'showPage' : function () {
				var adminRequest = App.request( 'user:isAdmin' );
				var toolsRequest = App.request( 'admin:tools' );

				// show a loading view while we wait
				this.layout.content.show( new App.Common.LoadingView() );

				App.when( adminRequest, toolsRequest ).done( function ( isAdmin, tools ) {

					if ( isAdmin ) {

						// show the admin view with a dropdown list of tools
						this.layout.content.show( new NavView( {
							'tools' : tools
						} ) );

					} else {
						this.layout.content.show( new NonAdminView() );
					}

				}.bind( this ) );

			}

		} );

	} );

} );
