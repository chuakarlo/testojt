define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var stripHtml  = require( 'common/helpers/stripHtml' );
	var $          = require( 'jquery' );
	var template   = require( 'text!groups/templates/resources/groupResourceItemView.html' );

	var Autolinker = require( 'autolinker' );

	var autolinker = new Autolinker( {
		newWindow   : false,
		stripPrefix : false,
		className   : 'link'
	} );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),
		'tagName'  : 'li',
		'ui'       : {
			'resourceDownload' : '.resource-download'
		},
		'events'   : {
			'click @ui.resourceDownload' : 'downloadResource'
		},

		'onRender' : function () {
			var resourceDescription = ( this.model.get( 'FileDescription' ) ) ? stripHtml ( this.model.get( 'FileDescription' ) ) : stripHtml ( this.model.get( 'LinkDescription' ) );
			$( this.el ).find( '.resource-description' ).prepend( autolinker.link( resourceDescription ) );
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
