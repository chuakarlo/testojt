define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );

	var template   = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );

	//confirm and ActiveXObject are globals that are defined externally
	/*global ActiveXObject: false */

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName'  : 'li',

		'ui'       : {
			'thumbnail'    : '.video-resources-thumb img',
			'pdfModal'     : '#pdf-modal',
			'modalContent' : '#pdf-holder'
		},

		'events' : {
			'click @ui.thumbnail' : 'previewFile'
		},

		'previewFile' : function () {
			var hasPlugin = this.checkForPdfPlugin();
			var isIE      = this.isIE();
			var isPreview = this.isPreview();
			var tags = {
				'iframe' : 'iframe',
				'embed'  : 'embed'
			};

			if ( isPreview !== false ) {
				if ( isIE ) {
					if ( hasPlugin ) {
						this.showPdfModal( isPreview, tags.iframe );
					} else {
						return false;
					}
				} else {
					this.showPdfModal( isPreview, tags.embed );
				}
			} else {
				return false;
			}
		},

		'showPdfModal' : function ( previewPath, tag ) {
			this.ui.pdfModal.modal( 'show' );
			//use iframe if ie and embed if not
			this.ui.modalContent.html( function () {
			  return '<'+ tag +' id="modal-iframe" src='+ previewPath + '></'+ tag + '>';
			});
		},

		'isPreview' : function () {
			var previewPath = this.model.get( 'previewPath' );
			return previewPath !== '' ? previewPath : false;
		},

		'checkForPdfPlugin' : function () {
			var isAdobe = this.getPDFPlugin();
			return ( ( isAdobe !== null ) && ( isAdobe !== undefined ) ) ? true : false;
		},
		//get pdf plugin in ie
		'getPDFPlugin' : function () {
			// load the activeX control
			// AcroPDF.PDF is used by version 7 and later
			// PDF.PdfCtrl is used by version 6 and earlier
			return this.getActiveXObject( 'AcroPDF.PDF' ) || this.getActiveXObject( 'PDF.PdfCtrl' );
		},
		//check if browser is ie
		'isIE' : function () {
			var userAgent = navigator ? navigator.userAgent.toLowerCase() : 'other';
			var msie      = userAgent.indexOf( 'msie' ); //for older version of ie
			var trident   = userAgent.indexOf( 'trident/' ); //for newer version of ie

			return ( ( msie !== -1 ) || ( trident !== -1 ) ) ? true : false;
		},

		'getActiveXObject' : function ( name ) {
			try {
				return new ActiveXObject( name );
			} catch( e ) {}
		}

	} );

} );