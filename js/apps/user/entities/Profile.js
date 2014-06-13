define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var Remoting = require( 'Remoting' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	App.module( 'Entities', function ( Entities ) {

		Entities.Profile = Backbone.CFModel.extend( {

			'path' : 'core.ClientPersonnelProfileGateway',

			'idAttribute' : 'PersonnelId',

			'getReadOptions' : function () {
				return {
					'method' : 'getById',
					'args'   : {
						'id' : Session.personnelId()
					}
				};
			},

			'getUpdateOptions' : function () {
				return {
					'method'     : 'update',
					'objectPath' : 'core.ClientPersonnelProfile',
					'args'       : this.toJSON()
				};
			},

			'updateSearchIndex' : function () {
				var data = {
					'path'   : 'SearchService',
					'method' : 'updateClientPersonnelSearchIndex',
					'args'   : {
						'personnelId' : Session.personnelId()
					}
				};

				return Remoting.fetch( data );
			}

		} );

	} );

	var API = {

		'getProfile' : function () {
			var defer = $.Deferred();

			var profile = new App.Entities.Profile();

			profile.fetch( {

				'success' : function () {
					defer.resolve( profile );
				},

				'error' : function () {
					defer.reject( new Error( 'Error fetching profile' ) );
				}

			} );

			return defer.promise();
		}

	};

	App.reqres.setHandler( 'user:profile', function () {
		return API.getProfile();
	} );

} );
