define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Processes = Backbone.CFCollection.extend( {

			'path' : 'process.ProcessGateway',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getExtByEducatorForLearningTargets',
					'args'   : {
						'educId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getProcesses' : function () {
			var defer = $.Deferred();

			var processes = new App.Entities.Processes();

			processes.fetch( {

				'success' : function () {
					defer.resolve( processes );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching processes' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:processes', function () {
		return API.getProcesses();
	} );

} );
