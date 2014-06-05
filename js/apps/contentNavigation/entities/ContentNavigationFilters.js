define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.FilterModel = Backbone.Model.extend ( {

		} );

		Entities.FiltersCollection = Backbone.Collection.extend( {
			'model' : Entities.FilterModel
		} );

		Entities.FilterCFModel = Backbone.CFModel.extend( {

		} );

		Entities.Filters = Backbone.CFCollection.extend( {

			'path'  : 'RespondService',
			'model' : Entities.FilterCFModel,

			'getReadOptions' : function () {
				return {
					'method' : 'RespondGetContentFilters',
					'args'   : {
						'persId' : Session.personnelId()
					}
				};
			},

			'parse' : function ( data ) {
				data = data.FILTERS;

				return data;
			}

		} );

		var API = {

			'initializeFilters' : function ( defer ) {
				var filters = new Entities.Filters();

				filters.fetch( {

					'success' : function ( data ) {
						defer.resolve( filters );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching content filters.' );
					}

				} );
			},

			'getFilters' : function () {
				var defer = App.Deferred();

				this.initializeFilters( defer );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:filters', function () {
			return API.getFilters();
		} );

	} );

} );
