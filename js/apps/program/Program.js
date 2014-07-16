define( function ( require ) {
	'use strict';

	return function () {

		var Backbone   = require( 'backbone' );
		var AuthRouter = require( 'AuthRouter' );
		var App        = require( 'App' );

		App.module( 'Program', function ( Program ) {

			require( 'common/entities/Queue' );
			require( 'apps/program/views/Views' );
			require( 'apps/program/entities/Entities' );
			require( 'apps/program/controllers/ProgramController' );

			Program.Router = AuthRouter.extend( {
				'appRoutes' : {
					'resources/program?*queryString' : 'showProgram'
				}
			} );

			var API = {
				'showProgram' : function () {
					App.request( 'pd360:hide' );

					App.Program.Controller.ProgramPage.Show( {
						'query' : arguments[ 0 ]
					} );
				}
			};

			App.reqres.setHandler( 'program:isCorrectRoute', function () {
				return Backbone.history.fragment.match( /^resources\/program\?ContentId\=\d+&ContentParentId\=\d+&ContentTypeId\=\d+$/ );
			} );

			App.reqres.setHandler( 'program:isCorrectFragment', function () {
				return Backbone.history.fragment.match( /^resources\/program\?/ );
			} );

			App.addInitializer( function () {
				new Program.Router( {
					'controller' : API
				} );
			} );

		} );

	};

} );
