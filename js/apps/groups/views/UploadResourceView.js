define( function ( require ) {
	'use strict';

	var template   = require( 'text!../templates/uploadResourceView.html' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );
	var qq         = window.qq;
	var Session    = require( 'Session' );
	var stripHtml  = require( 'common/helpers/stripHtml' );
	var Ladda      = require( 'ladda' );

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

		'initialize' : function () {
			_.bindAll( this, 'submitForm' );
		},

		'events' : {

			'click .cancel-btn' : function () {
				App.navigate( 'groups/' + this.model.get( 'LicenseId' ) + '/resources', { 'trigger' : true } );
			},

			'click .submit-btn'     : 'submitForm',
			'change @ui.radioInput' : 'updateInputDisplay'

		},

		'updateInputDisplay' : function ( ev ) {
			if ( this.ui.radioInput.filter( ':checked' ).val() === 'file') {
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
			this.ui.fileInput.fineUploader( {

				'autoUpload' : false,

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

			// Set the allowedExtensions on the global obj...
			qq.FineUploader.prototype._options = {
				'validation' : {
					'allowedExtensions' : allowedExtensions
				}
			};

		},

		'submitForm' : function () {

			var data = { };

			data.fileDescription = stripHtml( this.ui.descInput.val() );
			data.resourceType = this.ui.radioInput.filter( ':checked' ).val();

			if ( data.resourceType === 'file' ) {
				// Validate the file extension and size
				if ( !this.validateFile() ) {
					return false;
				}
				data.fileName = this.ui.fileInput.val().split('\\').pop();
			} else {
				data.fileName = stripHtml( this.ui.urlInput.val() );
			}

			// Should be using Backbone.Validation here
			var messages = {
				'fileDescription' : 'File Description',
				'fileName'        : 'Resource'
			};

			var error = false;
			_.each( _.pairs( data ), function ( pair ) {
				if ( pair[ 1 ] === '' ) {
					App.errorHandler( {
						'message' : 'Invalid or missing ' + messages[ pair[ 0 ] ]
					} );
					error = true;
				}
			} );

			if ( error ) {
				return false;
			}

			var l = Ladda.create(
				document.querySelector( '.upload-actions > .submit-btn' )
			);
			l.start();

			// Should be safe to add the file now
			if ( data.resourceType === 'file' ) {
				this.ui.fileInput.fineUploader( 'addFiles', this.ui.fileInput );
			}

			// Prepare to upload the file ( makes a lot of requests... )
			var deferred = this.model.prepareResource( data );
			App.when( deferred ).done( _.bind( function ( resource ) {
				if ( data.resourceType === 'file' ) {
					var fileExt = data.fileName.match(  /.[^.]+$/, '' );
					var newFileName = 'file_' + resource.get( 'FileId' ) + '_' +
					Session.personnelId() + fileExt[ 0 ];

					$('input[name="user_file"]').fineUploader( 'setParams', {
						'newFileName' : newFileName
					} );

					this.ui.fileInput.on( 'complete', _.bind( function ( event, id, name, res ) {
						if ( res.success ) {
							var msg = 'NEW Resource: ' + resource.get( 'FileName' ) + ' - ' + resource.get( 'FileDescription' );
							this.createNewsEntry( msg, l );
							this.model.updateSearchIndex();
						}
					}, this ) );

					var url = 'com/schoolimprovement/pd360/dao/groups/ResourceFileUpload.cfc?method=Upload';
					this.ui.fileInput.fineUploader( 'setEndpoint', url );
					this.ui.fileInput.fineUploader( 'uploadStoredFiles' );
				} else {
					var msg = 'NEW Resource: ' + resource.get( 'LinkURL' ) + ' - ' + resource.get( 'LinkDescription' );
					this.createNewsEntry( msg, l );
				}

			}, this ) )
			.fail( function () {
				App.errorHandler( {
					'message' : 'There was an ERROR creating your resource. Please try again later.'
				} );
			});
		},

		'validateFile' : function () {
			// Check the file name and display an error if invalid. This is terrible
			// as fineuploader doesn't provide access to the actual validation methods.
			// Also the validation event triggers before the actual validation and
			// doesn't provide any information if the validation was succesful.
			// Seriously... whats the point of that?  (╯°□°)╯︵ ┻━┻
			var validation = qq.FineUploader.prototype._getValidationDescriptor( this.ui.fileInput[ 0 ].files[ 0 ] );
			if ( !qq.FineUploader.prototype._isAllowedExtension( validation.name ) ) {
				App.errorHandler( {
					'message' : validation.name + ' has an invalid extension. Valid extension(s): ' +
					qq.FineUploader.prototype._options.validation.allowedExtensions.join( ', ' )
				} );
				return false;
			}

			// Check the file size and display an error if invalid
			if ( validation.size > 10485760 ) {
				App.errorHandler( {
					'message' : validation.name + ' is too large, maximum file size is 10MB'
				} );
				return false;
			}
			return true;
		},

		'createNewsEntry' : function ( msg, l ) {
			// l is the ladda instance
			var entry = this.model.createNewsEntry( msg );
			entry.save( null, {
				'success' : function ( model ) {
					l.stop();
					App.navigate( 'groups/' + model.get( 'LicenseId' ) + '/resources', {
						'trigger' : true
					} );
				},

				'error' : function ( model ) {
					var msg = 'There may have been a problem creating the group wall notification' +
					' for your resource. The resource is still available in the resources tab.' +
					' You will be redirected shortly.';

					App.vent.trigger( 'flash:message', {
						'type'    : 'warning',
						'message' : msg,
						'timeout' : 12000
					} );
					setTimeout( function () {
						App.navigate( 'groups/' + model.get( 'LicenseId' ) + '/resources', {
							'trigger' : true
						} );
					}, 12000 );
					l.stop();
				}
			} );
		}

	} );
} );
