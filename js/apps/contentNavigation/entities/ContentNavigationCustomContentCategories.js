define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.CustomContentCategoryModel = Backbone.CFModel.extend( {

		} );

		Entities.CustomContentCategories = Backbone.CFCollection.extend( {

			'path'  : 'RespondService',
			'model' : Entities.CustomContentCategoryModel,

			'getReadOptions' : function () {
				return {
					'method' : 'RespondCustomContentGetTree',
					'args'   : {
						'licenseTypeId'        : 1,
						'licenseContentTypeId' : this.licenseModel.get( 'LicenseContentTypeId' )
					}
				};
			}

		} );

		var API = {

			'initializeCategories' : function ( defer , model ) {
				var categories = new Entities.CustomContentCategories();

				categories.licenseModel = model;

				categories.fetch( {

					'success' : function ( data ) {
						defer.resolve( categories );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching custom content categories.' );
					}

				} );
			},

			'getCategories' : function ( model ) {
				var defer = App.Deferred();

				this.initializeCategories( defer , model );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:customContent:categories', function ( model ) {
			return API.getCategories( model );
		} );

	} );

} );
