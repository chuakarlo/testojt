define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Subject = Backbone.CFModel.extend( {

			'idAttribute' : 'CCSubjectId'

		} );

		Entities.Subjects = Backbone.CFCollection.extend( {

			'path' : 'commoncore.CCSubjectVVGateway',

			'model' : Entities.Subject,

			'getReadOptions' : function () {
				return {
					'method' : 'getAll',
					'args' : {
						'id' : ''
					}
				};
			}

		} );

		var Controller = Marionette.Controller.extend( {

			'getSubjects' : function () {
				var defer = $.Deferred();

				var subjects = new Entities.Subjects();

				subjects.fetch( {

					'success' : function () {
						defer.resolve( subjects );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching Subjects' ) );
					}

				} );

				return defer.promise();
			}

		} );

		var API = new Controller();

		App.reqres.setHandler( 'user:subjects', function () {
			return API.getSubjects();
		} );

	} );

} );