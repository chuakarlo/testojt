define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	var template   = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );

	require( 'jquery-browser' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li',

		'ui' : {
			'thumbnail'    : '.video-resources-thumb img',
			'pdfModal'     : '#pdf-modal',
			'modalContent' : '#pdf-holder'
		},

		'events' : {
			'click @ui.thumbnail' : 'previewFile'
		},

		'previewFile' : function () {
			var previewPath = this.model.get( 'previewPath' );

			if ( previewPath === '' ) {
				return false;
			}

			// Chrome pdf in iframe has issues with displaying
			// pdf files. Use `embed` tag instead.
			if ( $.browser.name === 'chrome' ) {
				this.showPdfModal( previewPath, 'embed' );
			} else {
				this.showPdfModal( previewPath, 'iframe' );
			}
		},

		'showPdfModal' : function ( previewPath, tag ) {
			this.ui.pdfModal.modal( 'show' );
			//use embed if google chrome and iframe if not
			this.ui.modalContent.html( function () {
			  return '<'+ tag +' id="modal-iframe" src='+ previewPath + '></'+ tag + '>';
			} );
		}

	} );

} );