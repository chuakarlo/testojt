define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'parse' : function ( model ) {
			if ( !model.ContentId ) {
				return model;
			}
			model = this._computeMinSec( model );
			model = this._setContentNameLength( model );
			model = this._setViewCompleted( model );
			model = this._setImageUrl( model );
			model = this._setContentDescriptionLength( model );

			return model;
		},

		'_computeMinSec' : function ( model ) {
			var hr  = Math.floor( model.SegmentLengthInSeconds / 3600 );
			var min = Math.floor( ( model.SegmentLengthInSeconds - hr * 3600 ) / 60 );
			var s   = Math.floor( model.SegmentLengthInSeconds - ( hr * 3600 + min * 60 ) );

			model.min = min;
			model.sec = s > 9 ? s : '0' + s;

			return model;
		},

		'_setContentNameLength' : function ( model ) {
			model.CName = model.ContentName;
			if ( model.ContentName.length > 35 ) {
				model.CName = model.ContentName.substr( 0, 35 ) + '...';
			}

			return model;
		},

		'_setViewCompleted' : function ( model ) {
			model.VCompleted = '';
			if ( model.ViewingCompleted ) {
				model.VCompleted = 'completed';
			}

			return model;
		},

		'_setImageUrl' : function ( model ) {

			if ( model.ImageURL.length <= 0 ) {
				model.ImageURL = 'http://resources.pd360.com/PD360/media/thumb/thumb_' + model.FileName.replace( /(.flv|.mov|.mp4)/, '.jpg' );
			}

			return model;
		},

		'_setContentDescriptionLength' : function ( model ) {
			model.ContentDescription = model.ContentDescription.replace( /(<([^>]+)>)/ig, '' );
			model.ContentDescription = model.ContentDescription;

			if ( model.ContentDescription.length > 270 ) {
				model.ContentDescription = model.ContentDescription.substr( 0, 270 ) + '...';
			}

			model.CDescription = model.ContentDescription.replace( /-/ig, '<br>-' );

			return model;
		}

	} );
} );
