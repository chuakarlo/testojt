define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'VideoPlayer.Entities', function ( Entities ) {

		Entities.RelatedVideo = Backbone.CFModel.extend( {

			'idAttribute' : 'ContentId',

			'initialize' : function () {
				this.setVideoTypeId();
			},

			'setVideoTypeId' : function () {
				this.set( 'VideoTypeId', 1 );
			},

			'setQueue' : function ( queueContents ) {
				this.set( 'queued', _.contains( queueContents.pluck( 'ContentId' ), this.id ) );
			}

		} );

		Entities.RelatedVideos = Backbone.CFCollection.extend( {

			'path'  : 'RespondService',
			'model' : Entities.RelatedVideo,

			'initialize' : function ( options ) {
				_.bindAll( this );
				_.extend( this, options );

				return this;
			},

			'getReadOptions' : function () {
				return {
					'method' : 'relatedVideos',
					'args'   : {
						'ContentId' : this.contentId
					}
				};
			},

			'parse' : function ( response ) {
				return _.rest( response );
			}

		} );

		var API = {
			'getRelatedVideos' : function ( contentId ) {
				var defer         = App.Deferred();
				var relatedVideos = new Entities.RelatedVideos( { 'contentId' : contentId } );

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
