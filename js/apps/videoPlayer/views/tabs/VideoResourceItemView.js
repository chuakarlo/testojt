define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var App         = require( 'App' );
	var PreviewView = require( 'videoPlayer/views/tabs/PreviewItemView' );
	var template    = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',

		'ui' : {
			'thumbnail' : '.video-resources-thumb > img'
		},

		'events' : {
			'click @ui.thumbnail' : 'previewFile'
		},

		'previewFile' : function ( e ) {
			e.preventDefault();

			var previewPath = this.model.get( 'previewPath' );
			var pdfPreview  = new PreviewView( { 'model' : this.model } );

			if ( previewPath === '' ) {
				return false;
			} else {
				App.modalRegion.show( pdfPreview, {
					'className' : 'pdf-preview-modal'
				} );
			}
		}

	} );

} );
