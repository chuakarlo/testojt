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
			'descInput'     : '.file-description',
			'urlInput'      : 'input[name="url-input"]',
			'fileInput'     : 'input[name="user_file"]',
			'radioInput'    : 'input[name="upload-type"]',
			'linkContainer' : '.js-upload-link-container',
			'fileContainer' : '.js-upload-file-container',
			'fileUpload'    : '.js-upload-file-wrapper'
		},

		'events' : {

			'click .cancel-btn' : function () {
				App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', { 'trigger' : true } );
			},

			'click .submit-btn'     : 'submitForm',
			'change @ui.radioInput' : 'updateInputDisplay',
			'click .file-btn'       : function ( ev ) {
				ev.currentTarget.nextElementSibling.click();
			}

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

			if ( data.fileDescription.match( /^\s*$/ ) ) {
				App.errorHandler( new Error( 'Invalid or missing ' + data.resourceType + ' description' ) );

				return false;
			}

			var l = Ladda.create(
				document.querySelector( '.submit-btn' )
			);

			l.start();

			if ( data.resourceType === 'file' ) {
				// Handle FILES

				if ( $( '.qq-upload-file' ).text() === '' ) {
					App.errorHandler( new Error( 'Please attach a file to upload.' ) );
					l.stop();

					return false;
				}

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
				if ( link.match( /^\s*$/ ) || link === 'http://' ) {
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
				.fail( App.errorHandler )
				.always( function () {
					l.stop();
				} );
			}
		}

	} );
} );
