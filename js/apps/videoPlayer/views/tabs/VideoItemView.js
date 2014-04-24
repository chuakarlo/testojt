define( function ( require ) {
	'use strict';

	var Marionette   = require( 'marionette' );
	var _            = require( 'underscore' );
	var template     = require( 'text!videoPlayer/templates/tabs/videoItemView.html' );
	var hhmmssFormat = require( 'videoPlayer/utils/toHHMMSSFormat' );

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),

		'tagName'   : 'div',

		'templateHelpers' : {

			'imageUrl' : function () {
				var url = 'http://resources.pd360.com/PD360/media/thumb/';
				return url + this.ImageURL;
			},

			'duration' : function () {
				return hhmmssFormat( this.SegmentLengthInSeconds );
			}

		}

	} );

} );
