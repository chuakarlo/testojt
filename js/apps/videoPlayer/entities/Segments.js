define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	require( 'videoPlayer/entities/Content' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.Segments = Backbone.CFCollection.extend( {

			'model' : Entities.Content,

			'path'  : 'ContentService',

			'initialize' : function ( models, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getProgramFromSegment',
					'args'   : {
						'ContentId'       : this.ContentId,
						'ContentParentId' : this.ContentParentId,
						'ContentTypeId'   : this.ContentTypeId
					}
				};
			},

			'parse' : function ( response ) {
				return _.filter( response, function ( segment ) {
					if ( segment.ContentId !== this.ContentId ) {
						return segment;
					}
				}.bind( this ) );
			}

		} );

		var API = {

			'getSegments' : function ( content ) {
				var defer = $.Deferred();

				var segments = new Entities.Segments( [ ], {
					'ContentId'       : content.ContentId,
					'ContentParentId' : content.ContentParentId,
					'ContentTypeId'   : content.ContentTypeId
				} );

				segments.fetch( {

					'success' : function () {
						defer.resolve( segments );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching results' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'videoPlayer:segments', function ( content ) {
			return API.getSegments( content );
		} );

	} );

} );
