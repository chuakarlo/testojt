define( function ( require ) {
	'use strict';

	var Backbone          = require( 'backbone' );
	var getAbbreviation   = require( 'common/helpers/getAbbreviation' );
	var convertSecsToMins = require( 'common/helpers/convertSecsToMins' );

	return Backbone.Model.extend( {

		'idAttribute' : 'ContentId',

		'parse' : function ( model ) {
			if ( model.ContentId ) {
				model.CName = model.ContentName;

				this._parseModel( model );
			}

			return model;
		},

		'_parseModel' : function ( model ) {
			model.SegmentLength = convertSecsToMins( model.SegmentLengthInSeconds );
			model.CName         = getAbbreviation ( model.ContentName, 50 );
			model.ImageURL      = 'thumb_' + model.FileName.replace( /(.flv|.mov|.mp4)/, '.jpg' );

			return model;
		}

	} );
} );
