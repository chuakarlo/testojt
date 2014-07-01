define( function ( require ) {
	'use strict';

	var _                   = require( 'underscore' );
	var imageTemplate       = require( 'text!apps/homepage/external/billboard/templates/billboardImageView.html' );
	var linkTemplate        = require( 'text!apps/homepage/external/billboard/templates/billBoardLinkView.html' );
	var captionTemplate     = require( 'text!apps/homepage/external/billboard/templates/billboardCaptionView.html' );
	var urlTemplate         = require( 'text!apps/homepage/external/billboard/templates/billboardUrlView.html' );

	var videoPlayerBaseUrl = 'resources/videos/';
	var imageHtmlKey       = '<%- billboard.imageHTML %>';
	var captionKey         = '<%- billboard.caption %>';

	function setTemplate ( template, billboard, key ) {
		return template.replace( key, billboard );
	}

	function vidSplit ( billboard ) {
		return videoPlayerBaseUrl + billboard.LinkURL.split( 'ContentId=' )[ 1 ];
	}

	function doBillboardLinkOnly ( billboard ) {
		billboard.imageHTML = _.template( setTemplate( linkTemplate, billboard.imageHTML, imageHtmlKey ), {
			billboard : billboard
		} );
	}

	function doBillboardWithCaption ( billboard ) {
		//Assuming that the last token will be the content ID
		billboard.VideoURL = vidSplit( billboard );
		billboard.caption  = _.template( urlTemplate, {
			billboard : billboard
		} );
	}

	function setCaption ( billboard ) {
		var board = String( billboard.LinkURL );
		if ( board.indexOf( 'ContentId=' ) > -1 ) {
			doBillboardWithCaption( billboard );
		} else if ( billboard.LinkURL ) {
			doBillboardLinkOnly( billboard );
		}
	}

	function setBillboardValues ( billboard, index ) {
		billboard.index = index;

		billboard.imageHTML   = _.template( imageTemplate, {
			billboard : billboard
		} );

		billboard.caption = '';
		setCaption( billboard );
	}

	return function ( billboardData, callback ) {

		var images   = '';
		var captions = '';

		_.each( billboardData, function ( billboard, index ) {
			setBillboardValues( billboard, index );
			images   += billboard.imageHTML;
			captions += _.template( setTemplate( captionTemplate, billboard.caption, captionKey ), {
				billboard : billboard
			} );
		} );

		callback( {
			'images'   : images,
			'captions' : captions
		} );
	};
} );
