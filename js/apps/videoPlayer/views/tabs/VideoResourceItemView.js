define( function ( require ) {
	'use strict';

	var _           = require( 'underscore' );
	var Marionette  = require( 'marionette' );
	var template    = require( 'text!videoPlayer/templates/tabs/videoResourceItemView.html' );
	var utils       = require( 'videoPlayer/utils/utils' );

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
			if ( !utils.isMobile() ) {
				this.ui.download.tooltip( { 'title' : 'Download' } );
			}
		},

		'onClose' : function () {
			this.ui.download.tooltip( 'destroy' );
		},

		'previewFile' : function ( e ) {
			e.preventDefault();

			window.open( this.model.get( 'downloadPath' ) );
		}

	} );

} );
