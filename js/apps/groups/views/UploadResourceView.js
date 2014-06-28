define( function ( require ) {
	'use strict';

	var template   = require( 'text!../templates/uploadResourceView.html' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var stripHtml  = require( 'common/helpers/stripHtml' );
	var Ladda      = require( 'ladda' );

	var uploadTemplate     = require( 'text!groups/templates/upload/UploadTemplate.html' );
	var uploadFileTemplate = require( 'text!groups/templates/upload/FileTemplate.html' );

	require( 'fine-uploader' );

	return Marionette.ItemView.extend( {

		'template'   : _.template( template ),

		'className'  : 'upload-resource',

		'ui' : {
			'descInput'     : '.file-description',
			'urlInput'      : 'input[name="url-input"]',
			'fileInput'     : 'input[name="user_file"]',
			'radioInput'    : 'input[name="upload-type"]',
			'linkContainer' : '.upload-link-container',
			'fileContainer' : '.upload-file-container'
		},

		'events' : {

			'click .cancel-btn' : function () {
				App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', { 'trigger' : true } );
			},

			'click .submit-btn'     : 'submitForm',
			'change @ui.radioInput' : 'updateInputDisplay'

		},

		'updateInputDisplay' : function ( ev ) {
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
			this.ui.fileContainer.fineUploader( {

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
					App.errorHandler( {
						'message' : message
					} );
				}

			} );

		},

		'submitForm' : function () {

			var data = { };

			data.fileDescription = stripHtml( this.ui.descInput.val() );
			data.resourceType = this.ui.radioInput.filter( ':checked' ).val();

			var l = Ladda.create(
				document.querySelector( '.upload-actions > .submit-btn' )
			);

			l.start();

			if ( data.resourceType === 'file' ) {
				// Handle FILES

				this.ui.fileContainer.fineUploader( 'setParams', {
					'type'        : data.resourceType,
					'description' : data.fileDescription,
					'personnelId' : parseInt( App.request( 'session:personnelId' ) ),
					'groupId'     : this.model.get( 'LicenseId' )
				} );

				this.ui.fileContainer.on( 'complete', _.bind( function ( event, id, name, res ) {
					if ( res.success ) {
						l.stop();
						App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', {
							'trigger' : true
						} );
					} else if ( res.error ) {
						App.errorHandler( {
							'message' : res.error
						} );
						l.stop();
					}
				}, this ) );

				var url = 'com/schoolimprovement/pd360/dao/groups/GroupResourceUpload.cfc?method=UploadFile';
				this.ui.fileContainer.fineUploader( 'setEndpoint', url );
				this.ui.fileContainer.fineUploader( 'uploadStoredFiles' );
			} else {
				// Handle LINKS

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
						App.errorHandler( {
							'message' : res.error
						} );
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
