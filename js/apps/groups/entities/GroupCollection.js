define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	var Groups = Backbone.CFCollection.extend( {

		'getReadOptions' : function () {
			return {
				'method' : 'getValidGroupsByPersonnelIdOrderedByRecentActivity',
				'args'   : {
					'persId' : Session.personnelId()
				}
			};
		},

		'path' : 'GroupService',

		'comparator' : 'LicenseName'

	} );

	var API = {

		'initializeGroups' : function ( defer ) {
			var groups = new Groups();

			groups.fetch( {

				'success' : function () {
					defer.resolve( groups );
				},

				'error' : function () {
					defer.reject( 'There was an error fetching groups.' );
				}

			} );
		},

		'getGroups' : function () {
			var defer = App.Deferred();

			this.initializeGroups( defer );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'user:groups', function () {
		return API.getGroups();
	} );

} );
