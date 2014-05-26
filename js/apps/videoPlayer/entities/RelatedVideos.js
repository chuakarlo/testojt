define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var App      = require( 'App' );

	require( 'videoPlayer/entities/Content' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.RelatedVideos = Backbone.CFCollection.extend( {

			'model' : Entities.Content,

			'path'  : 'SearchService',

			'initialize' : function ( models, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchAPI',
					'args'   : {
						'persId'     : Session.personnelId(),
						'start'      : 0,
						'rows'       : 24,
						'searchType' : 'RelatedContent',
						'searchData' : this.Tags.join( ',' ),
						'sort'       : 'created desc'
					}
				};
			},

			'parse' : function ( response ) {
				// Removed first index in the array which is
				// not part of the data.
				return _.rest( response );
			}

		} );

		var API = {

			'getRelatedVideos' : function ( content ) {
				var defer = App.Deferred();

				var relatedVideos = new Entities.RelatedVideos( [ ], content );

				relatedVideos.fetch( {

					'success' : function () {
						defer.resolve( relatedVideos );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching related videos' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'videoPlayer:relatedVideos', function ( content ) {
			return API.getRelatedVideos( content );
		} );

	} );

} );
