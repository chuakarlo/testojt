define( function ( require ) {
	'use strict';

	var template        = require( 'text!../templates/uploadResourceView.html' );
	var _               = require( 'underscore' );
	var Marionette      = require( 'marionette' );
	var $               = require( 'jquery' );
	var App             = require( 'App' );
	var stripHtml       = require( 'common/helpers/stripHtml' );

	var fileExtensions = [ '.jpg', '.gif', '.png', '.jpeg', '.doc', '.rtf', '.ppt', '.docx', '.pptx', '.xls', '.xlsx', '.odt', '.xps', '.flv', '.pdf', '.txt' ];
	var url            = 'http://storage.pd360.com/DEV/uploads/file/';

	return Marionette.ItemView.extend( {
		'template'   : _.template( template ),
		'className'  : 'upload-resource',
		'initialize' : function ( options ) {
			this.groupModel = options.groupModel;
		},

		'onShow' : function () {
			$( '.file-input' ).attr( 'accept', fileExtensions );
			$( '#resource-form' ).attr( 'method', 'post' );
		},

		'events' : {
			'click .radio-link' : function ( event ) {
				$( '.upload-content-file' ).hide();
				$( '.file-error' ).hide();
				$( '.upload-content-link' ).show();
				$( '.upload-link' ).attr( 'required', true );
			},
			'click .radio-file' : function ( event ) {
				$( '.upload-content-link' ).hide();
				$( '.file-error' ).hide();
				$( '.upload-content-file' ).show();
				$( '.upload-link' ).removeAttr( 'required' );
			},

			'click .cancel-btn' : function () {
				App.navigate( 'groups/' + this.groupModel.LicenseId + '/resources', { 'trigger' : true } );
			},
			'click .submit-btn' : function () {

				var data = { };

				data.description = stripHtml( $( '.file-description' ).val() );

				if ( $( 'input.radio-file' )[ 0 ].checked ) {
					data.file         = $( 'span.resource-preview' ).text();
					data.resourceType = 'file';
				} else {
					data.file         = stripHtml( $( '.upload-link' ).val() );
					data.resourceType = 'link';
				}

				if ( data.file === '' ) {
					this.showError( 'Please enter resource to be uploaded' );
				}
			},

			'focusin input.upload-link' : function () {
				$( '.file-error' ).hide();
			},

			'focusout input.upload-link' : function () {
				if ( $( '.upload-link' ).val() === '' ) {
					this.showError( 'Please enter resource link' );
				}
			},

			'change input[ type = file ]' : function ( ev ) {
				var browser = window.navigator.userAgent;
				var msie    = browser.indexOf( 'MSIE' );
				if ( msie > 0 && parseInt( browser.substring( msie + 5, browser.indexOf( '.', msie ) ) ) < 10 ) {
					this.inputChange();
				} else {
					this.checkFile( ev );
				}
			},
			'click .fileinput-button' : function () {
				$( '.file-input' ).click();
			}
		},

		'setURL' : function ( data ) {
			var fileExt     = data.FileName.match(  /.[^.]+$/, '' );
			var newFileName = 'file_' + data.FileId + '_' + data.PersonnelId + fileExt[ 0 ];
			var newUrl      = url + newFileName;

			$( '#resource-form' ).attr( 'action', newUrl );
			$( '#resource-form' ).submit( function () {
				var formData = new FormData();
				formData.append( 'user_file', this.file );
				$.ajax( {
					url         : newUrl,
					type        : 'POST',
					mimeType    : 'multipart/form-data',
					data        : formData,
					cache       : false,
					processData : false,
					success     : function () {
						App.Groups.Upload.Controller.createGroupNews( data, data.Created );
					}
				} );
			}.bind( this ) );
			$( '#resource-form' ).submit();
		},

		'showError' : function ( message ) {
			$( '.file-error span' ).text( message );
			$( '.file-error' ).show();
			$( '.no-file' ).show();
			$( '.resource-preview' ).text( '' );
		},

		'checkFile' : function ( ev ) {

			if ( ev.currentTarget.files.length > 0 ) {
				var file    = ev.currentTarget.files[ 0 ].name;
				var fileExt = file.match( /.[^.]+$/, '' );
				var fileSize = this.checkFileSize( ev.currentTarget.files[ 0 ].size );
				var fileType = this.checkFileType( fileExt[ 0 ] );
				if ( fileSize && fileType ) {
					this.filePreview( ev.currentTarget.files[ 0 ].name );
				}
				this.file = ev.currentTarget.files[ 0 ];
			}
		},

		'filePreview' : function ( file ) {
			$( '.no-file' ).hide();
			$( '.file-error' ).hide();
			$( '.resource-preview' ).text( file );
		},

		'inputChange' : function () {
			var file     = $( '.file-input' ).val();
			var fileName = file.match( /[-_\w]+[.][\w]+$/i );
			var fileExt  = file.match( /.[^.]+$/, '' );
			var fileType = this.checkFileType( fileExt[ 0 ] );
			if ( fileType ) {
				this.filePreview( fileName );
			}
		},

		'checkFileSize' : function ( fileSize ) {
			if ( fileSize < 10485760 ) {
				return true;
			} else {
				this.showError( 'File should not exceed 10MB' );
			}
		},

		'checkFileType' : function ( fileExt ) {
			if ( _.contains( fileExtensions, fileExt ) ) {
				return true;
			} else {
				this.showError( 'You can\'t upload files of this type.' );
			}
		}
	} );
} );
