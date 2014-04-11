 define ( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	var Remoting          = require( 'Remoting' );
	var VideoSegmentModel = require( 'videoPlayer/models/VideoSegmentModel' );
	var hhmmssFormat      = require( 'videoPlayer/utils/toHHMMSSFormat' );

	return Backbone.Collection.extend( {

		'model' : VideoSegmentModel,

		'url' : 'com.schoolimprovement.pd360.dao.ContentService',

		'method' : 'getProgramFromSegment',

		'initialize' : function() {},

		'fetch' : function ( request, options ) {
			options = options || {};

			request.path = this.url;

			request.method = this.method;

			var fetchingRequest = Remoting.fetch( request );

			if( options.success ) {
				fetchingRequest.then( options.success );
			}

			if( options.error ) {
				fetchingRequest.fail( options.error );
			}

			if( options.reset ) {
				fetchingRequest.done( _.bind( this.resetCollection, this ) );
			}

			return fetchingRequest;
		},

		'buildModels' : function ( models ) {
			var url = 'http://resources.pd360.com/PD360/media/thumb/';

			_.each( models, function ( model ) {
				model.url = url + model.ImageURL;
				model.duration = hhmmssFormat( model.SegmentLengthInSeconds );
			} );

			return models;
		},

		'resetCollection' : function ( collection ) {
			var resources = this.buildModels( _.first( collection ) );
			this.reset( resources );
			this.trigger( 'custom:sync' );
		}
	} );
} );
