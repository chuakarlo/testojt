define( function ( require ) {
	'use strict';

	var Backbone          = require( 'backbone' );
	var getAbbreviation   = require( 'common/helpers/getAbbreviation' );
	var convertSecsToMins = require( 'common/helpers/convertSecsToMins' );

	return Backbone.Model.extend( {

		'parse' : function ( model ) {
			if ( model.ContentId ) {
				model.CName         = model.ContentName;
				model.completed = {
					'icon'  : 'hide',
					'color' : ''
				};

				this._computeMinSec( model );
				this._setContentNameLength( model );
				this._setViewCompleted( model );
				this._setImageUrl( model );
			}

			return model;
		},

		'_computeMinSec' : function ( model ) {
			model.SegmentLength  = convertSecsToMins( model.SegmentLengthInSeconds );
			return model;
		},

		'_setContentNameLength' : function ( model ) {
			model.CName = getAbbreviation ( model.ContentName, 50 );
			return model;
		},

		'_setViewCompleted' : function ( model ) {
			if ( model.ViewingCompleted ) {
				model.completed = {
					'icon'  : '',
					'color' : 'success'
				};
			}
			return model;
		},

		'_setImageUrl' : function ( model ) {
			model.ImageURL = 'http://resources.pd360.com/PD360/media/thumb/thumb_' + model.FileName.replace( /(.flv|.mov|.mp4)/, '.jpg' );

			return model;
		}

	} );
} );
