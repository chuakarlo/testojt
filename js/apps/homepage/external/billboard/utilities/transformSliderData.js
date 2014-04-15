define( function ( require ) {
	'use strict';

	var _                   = require( 'underscore' );
	var imageTemplate       = require( 'text!apps/homepage/external/billboard/templates/billboardImageView.html' );
	var linkTemplate        = require( 'text!apps/homepage/external/billboard/templates/billBoardLinkView.html' );
	var captionTemplate     = require( 'text!apps/homepage/external/billboard/templates/billboardCaptionView.html' );
	var urlTemplate         = require( 'text!apps/homepage/external/billboard/templates/billboardUrlView.html' );

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

			billboard.caption     = billboard.VideoURL && billboard.CoverFlowTypeId ?
				_.template( urlTemplate, {
					billboard: billboard
				} ) : '';

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