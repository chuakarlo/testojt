define( function ( require ) {
	'use strict';

	var template   = require( 'text!../templates/uploadResourceView.html' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var stripHtml  = require( 'common/helpers/stripHtml' );
	var Ladda      = require( 'ladda' );
	var $          = require( 'jquery' );

	var uploadTemplate     = require( 'text!groups/templates/upload/UploadTemplate.html' );
	var uploadFileTemplate = require( 'text!groups/templates/upload/FileTemplate.html' );

	require( 'fine-uploader' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'upload-resource',

		'ui' : {
			'descInput'      : '.file-description',
			'radioInput'     : 'input[name="upload-type"]',
			'urlInput'       : 'input[name="url-input"]',
			'fileInput'      : 'input[name="user_file"]',
			'linkContainer'  : '.js-upload-link-container',
			'fileContainer'  : '.js-upload-file-container',
			'fileUpload'     : '.js-upload-file-wrapper',
			'backBtn'        : '.back-btn',
			'cancelSubmit'   : '.cancel-submit-btn',
			'uploadOptions'  : '.upload-options',
			'confirmation'   : '.confirmation-options',
			'uploadElements' : '.upload'

		},

		'events' : {

			'click .back-btn'        : function () {
				App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', { 'trigger' : true } );
			},
			'click .submit-btn'      : 'checkResource',
			'click .confirm-btn'     : 'submitForm',
			'change @ui.radioInput'  : 'updateInputDisplay',
			'click .file-btn'        : function ( ev ) {
				ev.currentTarget.nextElementSibling.click();
			},
			'click @ui.cancelSubmit' : 'showUploadOptions'

		},

		'updateInputDisplay' : function ( event ) {
			if ( this.ui.radioInput.filter( ':checked' ).val() === 'file' ) {
				this.ui.linkContainer.hide();
				this.ui.fileContainer.show();
			} else {
				this.ui.linkContainer.show();
				this.ui.fileContainer.hide();
			}
		},

		'onRender' : function () {

			// Hide the link option as the default selection is file
			this.ui.linkContainer.hide();

			var config = App.request( 'session:config' );

			var allowedExtensions = config.validFileUploadExtensions.split( ',' );
			var acceptFiles = _.map( allowedExtensions, function ( ext ) {
				return '.' + ext;
			} );

			// setup the fineuploader
			this.ui.fileUpload.fineUploader( {

				'autoUpload' : false,

				'multiple' : false,

				'fileTemplate' : _.template( uploadFileTemplate )(),

				'template' : _.template( uploadTemplate )(),

				'deleteFile' : {
					'enabled' : false
				},

				'editFilename' : {
					'enabled' : false
				},

				'text' : {
					'uploadButton' : '<a>Select File</a>'
				},

				'request' : {
					'forceMultipart' : false
				},

				'validation' : {
					'allowedExtensions' : allowedExtensions,
					'acceptFiles'       : acceptFiles,
					'sizeLimit'         : 10485760
				},

				'messages' : {
					'sizeError' : '{file} is too large, maximum file size is 10MB'
				},

				'showMessage' : function ( message ) {
					App.errorHandler( new Error( message ) );
				}

			} );

		},

		'submitForm' : function () {

			var data = { };

			data.fileDescription = stripHtml( this.ui.descInput.val() );
			data.resourceType    = this.ui.radioInput.filter( ':checked' ).val();

			var l = Ladda.create(
				document.querySelector( '.submit-btn' )
			);

			l.start();

			this.ui.cancelSubmit.addClass( 'disabled' );

			if ( data.resourceType === 'file' ) {
				// Handle FILES

				this.ui.fileUpload.fineUploader( 'setParams', {
					'type'        : data.resourceType,
					'description' : data.fileDescription,
					'personnelId' : parseInt( App.request( 'session:personnelId' ) ),
					'groupId'     : this.model.get( 'LicenseId' )
				} );

				this.ui.fileUpload.on( 'complete', _.bind( function ( event, id, name, res ) {
					if ( res.success ) {
						l.stop();
						App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', {
							'trigger' : true
						} );
					} else if ( res.error ) {
						App.errorHandler( new Error( res.error ) );
						l.stop();
					}
				}, this ) );

				var url = 'com/schoolimprovement/pd360/dao/groups/GroupResourceUpload.cfc?method=UploadFile';
				this.ui.fileUpload.fineUploader( 'setEndpoint', url );
				this.ui.fileUpload.fineUploader( 'uploadStoredFiles' );
			} else {
				// Handle LINKS

				var link = this.ui.urlInput.val().replace( /\s+/g, '' );

				var deferred = this.model.createLinkResource( {
					'linkURL'     : link,
					'description' : data.fileDescription
				} );

				App.when( deferred ).done( _.bind( function ( res ) {
					res = JSON.parse( res );
					if ( res.success ) {
						App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', {
							'trigger' : true
						} );
					} else if ( res.error ) {
						App.errorHandler( new Error( res.error ) );
					}
				}, this ) )
				.fail( App.errorHandler )
				.always( function () {
					l.stop();
				} );
			}
		},

		'showConfirmationMessage' : function () {
			this.ui.uploadOptions.hide();
			this.ui.confirmation.show();
			this.ui.confirmation.show();
			this.ui.uploadElements.attr( 'disabled', true );
			$( '.file-btn' ).attr( 'disabled', true );
			$( 'input[ type = file ]' ).attr( 'disabled', true );
			$( '.qq-upload-cancel' ).hide();

		},

		'showUploadOptions' : function () {
			this.ui.uploadOptions.show();
			this.ui.confirmation.hide();
			this.ui.uploadElements.attr( 'disabled', false );
			$( '.file-btn' ).attr( 'disabled', false );
			$( '.qq-upload-cancel' ).show();
			$( 'input[ type = file ]' ).attr( 'disabled', false );
		},

		'checkResource' : function () {
			var resourceType = this.ui.radioInput.filter( ':checked' ).val();

			if ( resourceType === 'file' ) {

				if ( $( '.qq-upload-file' ).text() === '' ) {
					App.errorHandler( new Error( 'Please attach a file to upload.' ) );
					return false;
				}

			} else {

				var link = this.ui.urlInput.val().replace( /\s+/g, '' );

				if ( link.match( /^\s*$/ ) || link === 'http://' ) {
					App.errorHandler( new Error( 'Invalid or Missing link' ) );
					return false;
				}
			}

			if ( stripHtml( this.ui.descInput.val() ).match( /^\s*$/ ) ) {
				App.errorHandler( new Error( 'Invalid or missing ' + resourceType + ' description' ) );
				return false;
			}

			this.showConfirmationMessage();
		}

	} );
} );
