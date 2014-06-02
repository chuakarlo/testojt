define( function ( require ) {
	'use strict';

	var App                 = require( 'App' );
	var Marionette          = require( 'marionette' );

	App.module( 'Groups.Create', function ( Mod ) {

		var CreateController = Marionette.Controller.extend( {

			'showCreateGroup' : function () {
				App.content.show( new App.Common.LoadingView() );
				var model = new App.Entities.GroupModel();
				var createView = new App.Groups.Views.GroupCreate( {
					'model' : model
				} );
				App.content.show( createView );
			}

		} );

		Mod.Controller = new CreateController();

	} );

} );
