define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	var VideoResourceModel = require( 'videoPlayer/models/VideoResourceModel' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.Segments = Backbone.CFCollection.extend( {

			'model' : VideoResourceModel,

			'path'  : 'ContentService',

			'initialize' : function ( models, options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getProgramFromSegment',
					'args'   : {
						'ContentId'       : this.contentId,
						'ContentParentId' : this.contentParentId,
						'ContentTypeId'   : this.contentTypeId
					}
				};
			},

			'parse' : function ( response ) {
				return _.filter( response, function ( segment ) {
					if ( segment.ContentId !== this.id ) {
						return segment;
					}
				}.bind( this ) );
			}

		} );

		var API = {

			'getSegments' : function ( content ) {
				var defer = $.Deferred();

				var segments = new Entities.Segments( [ ], {
					'id'              : content.id,
					'contentId'       : content.get( 'ContentId' ),
					'contentParentId' : content.get( 'ContentParentId' ),
					'contentTypeId'   : content.get( 'ContentTypeId' )
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
