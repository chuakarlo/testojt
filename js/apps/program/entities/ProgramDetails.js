define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var $        = require( 'jquery' );
	var Session  = require( 'Session' );

	App.module( 'Program.Entities', function ( Entities ) {

		Entities.ProgramSegment = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',

			'initialize'  : function () {
				this.set( 'VideoTypeId', 1 );
			}
		} );

		Entities.ProgramSegments = Backbone.CFCollection.extend( {

			'model' : this.ProgramSegment,

			'path'  : 'SearchService',

			'initialize' : function ( options ) {
				_.extend( this, options );
			},

			'getReadOptions' : function () {
				return {
					'method' : 'RespondSearchAPI',
					'args'   : {
						'persId'     : Session.personnelId(),
						'rows'       : 24,
						'searchData' : this.ContentId,
						'searchType' : 'VideosAll',
						'sort'       : 'score desc',
						'start'      : 0
					}
				};
			},

			'parse' : function ( result ) {
				var segments = result.slice( 1 );

				return _.find( segments, function ( model ) {

					return model.ContentId === parseInt( this.ContentId, 10 );
				}.bind( this ) );
			}
		} );

		var API = {

			'getSegments' : function ( args ) {
				var defer    = $.Deferred();
				var segments = new Entities.ProgramSegments( {
					'ContentId' : args.ContentId
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
