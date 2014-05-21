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

				if ( App.request( 'user:isAdmin' ) ) {

					this.layout.content.show( new NavView( {
						'tools' : App.request( 'admin:tools' )
					} ) );

				} else {

					this.layout.content.show( new NonAdminView() );

				}

			}

		} );

	} );

} );
