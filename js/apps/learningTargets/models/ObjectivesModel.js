define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'parse' : function ( model ) {

			if ( !model.ContentId ) {
				model.SSTitle = model.StateStandardTitle;
				this._setStateStandardTitleLength( model );
			} else {
				model.CName      = model.ContentName;
				model.VCompleted = '';

				this._computeMinSec( model );
				this._setContentNameLength( model );
				this._setViewCompleted( model );
				this._setImageUrl( model );
			}

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
			if ( model.ContentName.length > 50 ) {
				model.CName = model.ContentName.substr( 0, 35 ) + '...';
			}

			return model;
		},

		'_setStateStandardTitleLength' : function ( model ) {
			if ( model.StateStandardTitle.length > 50 ) {
				model.SSTitle = model.StateStandardTitle.substr( 0, 50 ) + '...';
			}

			return model;
		},

		'_setViewCompleted' : function ( model ) {

			if ( model.ViewingCompleted ) {
				model.VCompleted = 'completed';
			}

			return model;
		},

		'_setImageUrl' : function ( model ) {

			model.ImageURL = 'http://resources.pd360.com/PD360/media/thumb/thumb_' + model.FileName.replace( /(.flv|.mov|.mp4)/, '.jpg' );

			return model;
		}

	} );
} );
