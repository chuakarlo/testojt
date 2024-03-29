define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var template          = require( 'text!videoPlayer/templates/videoInfoItemView.html' );
	var convertSecsToMins = require( 'common/helpers/convertSecsToMins' );
	var stripHtml         = require( 'common/helpers/stripHtml' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'modal-dialog',

		'templateHelpers' : {

			'duration' : function () {
				var duration = this.SegmentLengthInSeconds;
				return duration === 0 ? '' : 'Duration: ' + convertSecsToMins( duration );
			},

			'description' : function () {
				var info = stripHtml( this.ContentDescription );

				if ( info.length === 0 ) {
					info = 'This video has no description provided.';
				}

				return info;
			}
		}

	} );

} );
