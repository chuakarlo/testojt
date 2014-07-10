define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var $           = require( 'jquery' );
	var App         = require( 'App' );
	var PreviewView = require( 'videoPlayer/views/tabs/PreviewItemView' );
	var NotifyView  = require( 'videoPlayer/views/tabs/NotifyItemView' );
	var template    = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );
	var utils       = require( 'videoPlayer/utils/utils' );

	/*global ActiveXObject: false */
	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li',

		'className' : 'col-xs-4',

		'ui' : {
			'thumbnail' : '.video-resources-thumb',
			'download'  : '.download-icon'
		},

		'events' : {
			'click @ui.thumbnail' : 'previewFile'
		},

		'initialize' : function () {
			this.clickEnable = true;
			if ( utils.isMobile() ) {
				this.clickEnable = false;
			}
		},

		'onShow' : function () {
			this.ui.download.tooltip( { 'title' : 'Download' } );
		},

		'onClose' : function () {
			this.ui.download.tooltip( 'destroy' );
		},

		'previewFile' : function ( e ) {
			e.preventDefault();

			var previewPath = this.model.get( 'previewPath' );

			if ( previewPath === '' ) {
				return;
			}

			// disable preview popup in mobile devices
			if ( this.clickEnable === true ) {
				// check if ie has adobe reader installed
				if ( $.browser.name === 'msie' && !this.checkForPdfPlugin() ) {
					var notifyView = new NotifyView();
					App.modalRegion.show( notifyView );
				} else {
					var pdfPreview = new PreviewView( { 'model' : this.model } );
					App.modalRegion.show( pdfPreview, {
						'className' : 'pdf-preview-modal'
					} );
				}
			} else {
				window.open( previewPath );
			}
		},

		'checkForPdfPlugin' : function () {
			var isAdobe = this.getPDFPlugin();
			return ( ( isAdobe !== null ) && ( isAdobe !== undefined ) ) ? true : false;
		},

		// get pdf plugin in ie
		'getPDFPlugin' : function () {
			// load the activeX control
			// AcroPDF.PDF is used by version 7 and later
			// PDF.PdfCtrl is used by version 6 and earlier
			return this.getActiveXObject( 'AcroPDF.PDF' ) || this.getActiveXObject( 'PDF.PdfCtrl' );
		},

		'getActiveXObject' : function ( name ) {
			try {
				return new ActiveXObject( name );
			} catch ( e ) {}
		}

	} );

} );
