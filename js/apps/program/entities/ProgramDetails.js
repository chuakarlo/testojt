define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var $        = require( 'jquery' );

	App.module( 'Program.Entities', function ( Entities ) {

		Entities.ProgramSegment = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',

			'initialize'  : function () {
				this.set( 'VideoTypeId', 1 );
			}
		} );

		Entities.ProgramSegments = Backbone.CFCollection.extend( {

			'model' : this.ProgramSegment,

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
			}
		} );

		var API = {

			'getSegments' : function ( args ) {
				var defer    = $.Deferred();
				var segments = new Entities.ProgramSegments( {
					'contentId'       : args.ContentId,
					'contentParentId' : args.ContentParentId,
					'contentTypeId'   : args.ContentTypeId
				} );

				segments.fetch( {

					'success' : function () {
						defer.resolve( segments );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching program details.' ) );
					}

				} );

				return defer.promise();
			}

		};

		App.reqres.setHandler( 'program:details', function ( args ) {
			return API.getSegments( args );
		} );

	} );

} );
