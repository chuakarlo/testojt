define ( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	var RelatedVideoModel = require( 'videoPlayer/models/RelatedVideoModel' );
	var hhmmssFormat      = require( 'videoPlayer/utils/toHHMMSSFormat' );

	return Backbone.Collection.extend( {

		'model'  : RelatedVideoModel,

		'initialize' : function( options ) {
			this.resetCollection( options );
		},

		'buildModels' : function ( models ) {
			var url = 'http://resources.pd360.com/PD360/media/thumb/';

			_.each( models, function ( model ) {
				model.url = url + model.ImageURL;
				model.duration = hhmmssFormat( model.SegmentLengthInSeconds );
			} );

			return models;
		},

		'resetCollection' : function ( models ) {
			var resources = this.buildModels( models );
			this.reset( resources );
			this.trigger( 'custom:sync' );
		}

	} );

} );