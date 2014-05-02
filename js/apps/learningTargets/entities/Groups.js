define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Groups = Backbone.CFCollection.extend( {

			'path' : 'GroupService',

			'idAttribute' : 'personnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getGroupsWithTasksByPersonnelId',
					'args'   : {
						'persId' : Session.personnelId()
					}
				};
			}

		} );

	} );

	var API = {

		'getGroups' : function () {
			var defer = $.Deferred();

			var groups = new App.Entities.Groups();

			groups.fetch( {

				'success' : function () {
					defer.resolve( groups );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching groups' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'lt:groups', function () {
		return API.getGroups();
	} );

} );
