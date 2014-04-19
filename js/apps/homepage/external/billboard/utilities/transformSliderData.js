define( function ( require ) {
	'use strict';

	var _                   = require( 'underscore' );
	var imageTemplate       = require( 'text!apps/homepage/external/billboard/templates/billboardImageView.html' );
	var linkTemplate        = require( 'text!apps/homepage/external/billboard/templates/billBoardLinkView.html' );
	var captionTemplate     = require( 'text!apps/homepage/external/billboard/templates/billboardCaptionView.html' );
	var urlTemplate         = require( 'text!apps/homepage/external/billboard/templates/billboardUrlView.html' );

	var videoPlayerBaseUrl = 'resources/videos/';

	return function ( billboardData, callback ) {

		var images   = '';
		var captions = '';

		_.each( billboardData, function( billboard, i ) {

			billboard.index       = i;

			billboard.imageHTML   = _.template( imageTemplate, {
				billboard: billboard
			} );

			if(billboard.LinkURL) {
				billboard.imageHTML = _.template( linkTemplate, {
					billboard: billboard
				} );
			}

			billboard.caption = '';

			if( billboard.VideoURL && billboard.CoverFlowTypeId ){
				var vidUrlParts = billboard.VideoURL.split('/');
				//Assuming that the last token will be the content ID
				billboard.VideoURL = videoPlayerBaseUrl + vidUrlParts[ vidUrlParts.length - 1 ];
				billboard.caption  = _.template( urlTemplate, {
					billboard: billboard
				} );
			}

			images   += billboard.imageHTML;
			captions += _.template( captionTemplate, {
				billboard: billboard
			} );
		});

		callback( {
			'images'   : images,
			'captions' : captions
		} );
	};
} );