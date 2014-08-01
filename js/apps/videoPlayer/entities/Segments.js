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
				var isArchived = this.startsWith( this.contentName, 'Archive:' );
				// exclude current segment and archive videos
				return _.filter( response, function ( segment ) {
					if ( segment.ContentId !== this.id && !isArchived ) {
						return segment;
					}
				}.bind( this ) );
			},

			// taken from https://github.com/epeli/underscore.string
			'startsWith' : function ( str, starts ) {
				if ( starts === '' ) {
					return true;
				}

				if ( str === null || starts === null ) {
					return false;
				}

				str    = String( str );
				starts = String( starts );

				return str.length >= starts.length && str.slice( 0, starts.length ) === starts;
			}

		} );

		var API = {

			'getSegments' : function ( content ) {
				var defer = $.Deferred();

				var segments = new Entities.Segments( [ ], {
					'id'              : content.id,
					'contentId'       : content.get( 'ContentId' ),
					'contentName'     : content.get( 'ContentName' ),
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
