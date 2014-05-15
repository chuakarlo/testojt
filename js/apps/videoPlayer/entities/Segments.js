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

		App.reqres.setHandler( 'videoPlayer:segments', function ( videoModel ) {
			return API.getSegments( videoModel );
		} );

	} );

} );
