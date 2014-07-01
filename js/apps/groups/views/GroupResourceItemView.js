define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var stripHtml  = require( 'common/helpers/stripHtml' );

	var template   = require( 'text!../templates/groupResourceItemView.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',
		'ui'       : {
			'resourceDownload' : '.resource-download'
		},
		'events'   : {
			'click @ui.resourceDownload' : 'downloadResource'
		},

		'templateHelpers' : {

			'getFileNameOrURL' : function () {
				if ( this.FileName ) {
					return this.FileName;
				} else {
					if ( this.LinkURL.indexOf( 'http://' ) !== -1 ) {
						return this.LinkURL;
					}
					return 'http://' + this.LinkURL;
				}
			},

			'getResourceDescription' : function () {
				// remove html tags and return description
				return ( this.FileDescription ) ? stripHtml ( this.FileDescription ) : stripHtml ( this.LinkDescription );
			},

			'getDownloadButtonStatus' : function () {
				return ( this.FileName ) ? '' : 'hidden';
			},

			'checkIfLink' : function () {
				return ( this.LinkURL ) ? '' : 'hidden';
			},

			'checkIfFile' : function () {
				return ( this.FileName ) ? '' : 'hidden';
			}
		},

		'downloadResource' : function () {

			this.model.updateViewCount();

			App.when( this.model.generateDownloadUrl() ).done( function ( url ) {
				window.open( url , '_self' );
			} );
		}

	} );

} );
