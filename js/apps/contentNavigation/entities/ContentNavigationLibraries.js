define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.LibraryModel = Backbone.CFModel.extend( {

			'defaults' : {
				'LibraryType' : 'customcontent'
			},

			'parse' : function ( item ) {

				return item;
			}

		} );

		Entities.Libraries = Backbone.CFCollection.extend( {

			'path'  : 'RespondService',
			'model' : Entities.LibraryModel,

			'getReadOptions' : function () {
				return {
					'method' : 'RespondCustomContentGetLicenses',
					'args'   : {
						'personnelId' : Session.personnelId()
					}
				};
			},

			'parse' : function ( data ) {
				// Insert PD360 and UUV Videos here
				data.unshift( { 'LicenseName' : 'PD 360', 'LibraryType' : 'pd360' } );
				data.push( { 'LicenseName' : 'User Uploaded Videos', 'LibraryType' : 'uuv' } );

				return data;
			}

		} );

		var API = {

			'initializeLibraries' : function ( defer ) {
				var libraries = new Entities.Libraries();

				libraries.fetch( {

					'success' : function ( data ) {
						defer.resolve( libraries );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching content libraries.' );
					}

				} );
			},

			'getLibraries' : function () {
				var defer = App.Deferred();

				this.initializeLibraries( defer );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:libraries', function () {
			return API.getLibraries();
		} );

	} );

} );
