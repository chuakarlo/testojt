define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	var App         = require( 'App' );
	var Session     = require( 'Session' );
	var VideosModel = require( 'homepage/models/VideoResourceModel' );

	App.module( 'Homepage.Entities', function ( Entities ) {

		Entities.RecommendedVideos = Backbone.CFCollection.extend( {

			'model' : VideosModel,

			'path' : 'RespondService',

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchRecommendedContent',
					'args'   : {
						'personnelId' : Session.personnelId(),
						'start'       : 0,
						'rows'        : 24,
						'sort'        : 'created desc'
					}
				};
			},

			'parse' : function ( response ) {
				// Removed metadata which is the first item in the
				// array response.
				return response.slice( 1 );
			}

		} );

		var API = {

			'getRecommendedVideos' : function () {
				var defer       = $.Deferred();
				var recommended = new Entities.RecommendedVideos();

				recommended.on( 'sync', function ( collection, response ) {
					// Save data from raw response in collection
					collection.data = _.first( response );
					defer.resolve( collection );
				} );
				recommended.on( 'error', defer.reject.bind( defer, new Error( 'Error fetching recommended videos.' ) ) );
				recommended.fetch();

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'homepage:recommendedVideos', API.getRecommendedVideos.bind( this ) );

	} );

} );
