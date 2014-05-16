define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	require( 'videoPlayer/entities/Content' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.RelatedVideos = Backbone.CFCollection.extend( {

			'model' : Entities.Content,

			'path'  : 'RespondService',

			'initialize' : function ( models, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'relatedVideos',
					'args'   : {
						'ContentId' : this.ContentId
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

			'getRelatedVideos' : function ( contentId ) {
				var defer = App.Deferred();

				var relatedVideos = new Entities.RelatedVideos( [ ], {
					'ContentId' : contentId
				} );

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

		App.reqres.setHandler( 'videoPlayer:getRelatedVideos', function ( contentId ) {
			return API.getRelatedVideos( contentId );
		} );

	} );

} );
