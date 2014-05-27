define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var $           = require( 'jquery' );
	var App         = require( 'App' );
	var PreviewView = require( 'videoPlayer/views/tabs/PreviewItemView' );
	var template    = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );

	require( 'jquery-browser' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'tagName' : 'li',

		'className' : 'col-md-3',

		'ui' : {
			'thumbnail' : '.video-resources-thumb > img',
			'download'  : '.download-icon'
		},

		'events' : {
			'click @ui.thumbnail' : 'previewFile',
			'click @ui.download'  : 'downloadFile'
		},

		'initialize' : function () {
			this.clickEnable = true;
			if ( $.browser.mobile ||  $.browser.ipad ) {
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
			//disable click in mobile devices
			if ( this.clickEnable === true && this.model.get( 'previewPath') !== '' ) {
				var pdfPreview = new PreviewView( { 'model' : this.model } );
				App.modalRegion.show( pdfPreview, {
					'className' : 'pdf-preview-modal'
				} );
			}
		},

		'downloadFile' : function () {
			//to do
		}

	} );

} );
