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
		},

		'getTaskTree' : function ( lid ) {

			var defer = $.Deferred();

			var TaskTree = Backbone.CFCollection.extend( {

				'path' : 'GroupService',

				'idAttribute' : 'personnelId',

				'getReadOptions' : function () {
					return {
						'method' : 'getTaskTreeByLicenseId',
						'args'   : {
							'persId' : Session.personnelId(),
							'id'     : lid
						}
					};
				}

			} );

			var taskTree = new TaskTree();
			taskTree.fetch( {

				'success' : function () {
					defer.resolve( taskTree );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching group task tree' ) );
				}

			} );

			return defer.promise();

		}

	};

	App.reqres.setHandler( 'lt:groups', function () {
		return API.getGroups();
	} );

	App.reqres.setHandler( 'lt:tasktree', function ( lid ) {
		return API.getTaskTree( lid );
	} );

} );
