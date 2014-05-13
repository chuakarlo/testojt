define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	var App      = require( 'App' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.Segment = Backbone.CFModel.extend( {
			'idAttribute' : 'ContentId'
		} );

		Entities.Segments = Backbone.CFCollection.extend( {

			'model' : Entities.Segment,
			'path'  : 'ContentService',

			'initialize' : function ( options ) {
				_.bindAll( this );
				_.extend( this, options );

				return this;
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
				var newSegments = _.filter( response, function ( model ) {
					if ( this.ContentId !== model.ContentId ) {
						return model;
					}
				}.bind( this ) );
				return newSegments;
			}

		} );

		var API = {

			'getSegments' : function ( videoModel ) {
				var defer = $.Deferred();

				var results = new Entities.Segments( {
					'ContentId'       : videoModel.get( 'ContentId' ),
					'ContentParentId' : videoModel.get( 'ContentParentId' ),
					'ContentTypeId'   : videoModel.get( 'ContentTypeId' )
				} );

				results.fetch( {

					'success' : function () {
						defer.resolve( results );
					},

					'error' : function () {
						defer.reject( new Error( 'Error fetching results' ) );
					}

				} );

				return defer.promise();
			}
		};

		App.reqres.setHandler( 'vq:segment', function ( videoModel ) {
			return API.getSegments( videoModel );
		} );

	} );
} );
