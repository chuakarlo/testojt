define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.GroupTasks = Backbone.CFCollection.extend( {

			'path' : 'GroupService',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				var id       = this.id;
				return {
					'method' : 'getTaskTreeByLicenseId',
					'args'   : {
						'id' : id
					}
				};
			}

		} );

	} );

	var API = {

		'getGroupTask' : function ( model ) {
			var defer      = $.Deferred();
			var groupTasks = new App.Entities.GroupTasks();
			groupTasks.id  = model.get( 'id' );

			groupTasks.fetch( {

				'success' : function () {
					defer.resolve( groupTasks );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching group tasks' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:groups', function ( model ) {
		return API.getGroupTask( model );
	} );

} );
