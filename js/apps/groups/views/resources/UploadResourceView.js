define( function ( require ) {
	'use strict';

	var template   = require( 'text!groups/templates/resources/uploadResourceView.html' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var stripHtml  = require( 'common/helpers/stripHtml' );
	var Ladda      = require( 'ladda' );

	require( 'fine-uploader' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'upload-resource',

		'ui' : {
			'descInput'      : '.file-description',
			'radioInput'     : 'input[name="upload-type"]',
			'urlInput'       : 'input[name="url-input"]',
			'linkContainer'  : '.js-upload-link-container',
			'fileContainer'  : '.js-upload-file-container',
			'fileUpload'     : '.js-upload-file-wrapper',
			'backBtn'        : '.back-btn',
			'cancelSubmit'   : '.cancel-submit-btn',
			'uploadOptions'  : '.upload-options',
			'confirmation'   : '.confirmation-options',
			'uploadElements' : '.upload-element',
			'removeFile'     : '.qq-upload-cancel',
			'fileSelect'     : '.file-selector',
			'fileName'       : '.qq-upload-file',
			'fileInput'      : 'input[name="qqfile"]'
		},

		'events' : {
			'click @ui.backBtn'      : 'navigateBack',
			'click .submit-btn'      : 'checkResource',
			'click .confirm-btn'     : 'submitForm',
			'change @ui.radioInput'  : 'updateInputDisplay',
			'click @ui.cancelSubmit' : 'showUploadOptions'
		},

		'navigateBack' : function () {
			App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', { 'trigger' : true } );
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
		},

		'onDomRefresh' : function () {
			var config = App.request( 'session:config' );

			var allowedExtensions = config.validFileUploadExtensions.split( ',' );
			var acceptFiles       = _.map( allowedExtensions, function ( ext ) {
				return '.' + ext;
			} );

			// setup the fineuploader
			this.ui.fileUpload.fineUploader( {

				'autoUpload' : false,

				'multiple' : false,

				'deleteFile' : {
					'enabled' : false
				},

				'request' : {
					'forceMultipart' : false,
					'endpoint' : 'com/schoolimprovement/pd360/dao/groups/GroupResourceUpload.cfc?method=UploadFile'
				},

				'validation' : {
					'allowedExtensions' : allowedExtensions,
					'acceptFiles'       : acceptFiles,
					'sizeLimit'         : 10485760
				},

				'showMessage' : function ( message ) {
					App.errorHandler( new Error( message ) );
				}

			} );

		},

		'submitForm' : function ( e ) {

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

				this.ui.fileUpload.fineUploader( 'uploadStoredFiles' );
			} else {
				// Handle LINKS
				e.preventDefault();
				this.ui.fileUpload.empty();
				this.ui.fileUpload.remove();

				// Check to make sure no empty urls are posted
				var link = this.ui.urlInput.val().replace( /\s+/g, '' );
	            if ( link.match( /^\s*$/ ) || link.match( /^\w*:\/\/$/ ) ) {
					App.errorHandler( new Error( 'Invalid or Missing link' ) );
					l.stop();

					return false;
				}

				var deferred = this.model.createLinkResource( {
					'linkURL'     : this.ui.urlInput.val(),
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
				.fail( function () {
					App.errorHandler( new Error( 'There was an issue uploading your resource. Please try again later.' ) );
				} )
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
			this.ui.fileSelect.addClass( 'disabled' );
			this.ui.fileInput.attr( 'disabled', true );
			this.ui.removeFile.hide();
		},

		'showUploadOptions' : function () {
			this.ui.uploadOptions.show();
			this.ui.confirmation.hide();
			this.ui.uploadElements.attr( 'disabled', false );
			this.ui.fileSelect.removeClass( 'disabled' );
			this.ui.fileInput.attr( 'disabled', false );
			this.ui.removeFile.show();
		},

		'checkResource' : function () {
			var resourceType = this.ui.radioInput.filter( ':checked' ).val();

			// rebind to ui elements because they may have changed from fine-uploader
			this.bindUIElements();

			if ( resourceType === 'file' ) {

				if ( this.ui.fileName.text() === '' ) {
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
