define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );

	App.module( 'ContentNavigation.Entities', function ( Entities ) {

		Entities.UUVCategoryModel = Backbone.CFModel.extend( {

		} );

		Entities.UUVCategoryCollection = Backbone.CFCollection.extend( {

			'path'  : 'uuvideos.UUVideoTopicsGateway',
			'model' : Entities.UUVCategoryModel,

			'getReadOptions' : function () {
				return {
					'method' : 'getAll',
					'args'   : {
						'persId' : Session.personnelId()
					}
				};
			},

			'parse' : function ( data ) {
				// My Uploads, Popular, Recommended For You, Featured : UUVideoTopic
				data.unshift( { 'UUVideoTopic' : 'Featured' } );
				data.unshift( { 'UUVideoTopic' : 'Recommended For You' } );
				data.unshift( { 'UUVideoTopic' : 'Popular' } );
				data.unshift( { 'UUVideoTopic' : 'My Uploads' } );

				return data;
			}

		} );

		var API = {

			'initializeCategories' : function ( defer ) {
				var categories = new Entities.UUVCategoryCollection();

				categories.fetch( {

					'success' : function ( data ) {
						defer.resolve( categories );
					},

					'error' : function () {
						defer.reject( 'There was an error fetching UUV content categories.' );
					}

				} );
			},

			'getCategories' : function () {
				var defer = App.Deferred();

				this.initializeCategories( defer );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'contentNavigation:uuv:getCategories', function () {
			return API.getCategories();
		} );

	} );

} );
