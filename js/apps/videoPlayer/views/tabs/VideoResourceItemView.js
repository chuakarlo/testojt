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
			'thumbnail' : '.video-resources-thumb > img'
		},

		'events' : {
			'click @ui.thumbnail' : 'previewFile'
		},

		'initialize' : function () {
			if ( $.browser.mobile ||  $.browser.ipad ) {
				this.clickEnable = false;
			}
		},

		'previewFile' : function ( e ) {
			e.preventDefault();
			//disable click in mobile devices
			if ( this.clickEnable === false) {
				return false;
			}

			var previewPath = this.model.get( 'previewPath' );
			var pdfPreview  = new PreviewView( { 'model' : this.model } );

			if ( previewPath === '') {
				return false;
			} else {
				App.modalRegion.show( pdfPreview, {
					'className' : 'pdf-preview-modal'
				} );
			}
		}

	} );

} );
