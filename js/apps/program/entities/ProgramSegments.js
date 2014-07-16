define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var $        = require( 'jquery' );

	App.module( 'Program.Entities', function ( Entities ) {

		Entities.SegmentModel = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',

			'initialize'  : function () {
				this.set( 'VideoTypeId', 1 );
			}
		} );

		Entities.Segments = Backbone.CFCollection.extend( {

			'model' : this.SegmentModel,

			'path'  : 'ContentService',

			'initialize' : function ( options ) {
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

				// make sure ProgramName is not set, to hide program link
				return _.each( response, function ( segment ) {
					segment.ProgramName = '';

					return segment;
				}.bind( this ) );
			}
		} );

		var API = {

			'getSegments' : function ( args ) {
				var defer    = $.Deferred();
				var segments = new Entities.Segments( {
					'contentId'       : args.ContentId,
					'contentParentId' : args.ContentParentId,
					'contentTypeId'   : args.ContentTypeId
				} );

				segments.fetch( {

					'success' : function () {
						defer.resolve( segments );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching program segments.' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'program:segments', function ( args ) {
			return API.getSegments( args );
		} );

	} );

} );
