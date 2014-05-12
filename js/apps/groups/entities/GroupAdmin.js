define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var $          = require( 'jquery' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );

	App.module( 'Entities', function ( Entities ) {

		Entities.GroupAdmin = Backbone.CFModel.extend( {

			'path' : 'GroupService',

			'getReadOptions' : function () {
				return {
					'method' : 'userIsGroupAdmin',
					'args'   : {
						'licId'  : this.id,
						'persId' : $.cookie( 'PID' ) || null
					}
				};
			}

		} );

		Entities.GroupCreator = Backbone.CFModel.extend( {

			'path' : 'GroupService',

			'getReadOptions' : function () {
				return {
					'method' : 'getGroupByLicenseId',
					'args'   : {
						'licId' : this.id
					}
				};
			}

		} );

		var Controller = Marionette.Controller.extend( {

			'isGroupAdmin' : function ( groupId ) {
				var defer = $.Deferred();

				var groupAdmin = new App.Entities.GroupAdmin( { 'id' : groupId } );

				groupAdmin.fetch( {

					'success' : function () {
						if ( groupAdmin.get( 'true' ) ) {
							defer.resolve( true );
						} else {
							defer.resolve( false );
						}
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching Group Admin' ) );
					}

				} );

				return defer.promise();
			},

			'isGroupCreator' : function ( groupId ) {
				var defer = $.Deferred();

				var groupCreator = new App.Entities.GroupCreator( { 'id' : groupId } );

				groupCreator.fetch( {

					'success' : function () {
						if ( String( groupCreator.get( 'Creator' ) ) === String( $.cookie( 'PID' ) ) ) {
							defer.resolve( true );
						} else {
							defer.resolve( false );
						}
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching Group Creator' ) );
					}

				} );

				return defer.promise();
			}

		} );

		var API = new Controller();

		App.reqres.setHandler( 'groups:isGroupAdmin', function ( groupId ) {
			return API.isGroupAdmin( groupId );
		} );

		App.reqres.setHandler( 'groups:isGroupCreator', function ( groupId ) {
			return API.isGroupCreator( groupId );
		} );

	} );

} );
