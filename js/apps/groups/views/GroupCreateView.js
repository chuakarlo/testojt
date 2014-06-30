define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/groupCreateView.html' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );

	var Ladda  = require( 'ladda' );
	var moment = require( 'moment' );

	var indexToChar = require( 'common/helpers/indexToChar' );

	var uploadTemplate     = require( 'text!groups/templates/upload/UploadTemplate.html' );
	var uploadFileTemplate = require( 'text!groups/templates/upload/FileTemplate.html' );

	require( 'backbone.stickit' );
	require( 'fine-uploader' );
	require( 'timezone' );

	return Marionette.ItemView.extend( {

		'template'   : _.template( template ),

		'className'  : 'groups-create',

		'events'    : {
			'click button.cancel-btn' : 'cancelCreateGroupClicked',
			'submit form'             : 'createGroupClicked'
		},

		'bindings' : {
			'#inputGroupName'           : 'LicenseName',
			'#inputGroupDescription'    : 'Misc',
			'input[name=optionsRadios]' : {
				'observe' : 'PrivateGroup',
				'onSet'   : 'toInt'
			},
			'#setGroupVisibility'       : {
				'observe' : 'Hidden',
				'onSet'   : 'toInt'
			}
		},

		'ui' : {
			'logo'   : '.logo-upload-select',
			'banner' : '.banner-upload-select',
			'create' : '.create'
		},

		'toInt' : function ( val, options ) {
			val = parseInt( val );
			if ( val ) {
				return 1;
			}
			return 0;
		},

		'onRender' : function () {
			this.stickit();
			this.initUploader();
		},

		'uploadOptions' : {

			'multiple'   : false,
			'autoUpload' : false,

			'fileTemplate' : _.template( uploadFileTemplate )(),

			'template' : _.template( uploadTemplate )(),

			'request' : {
				'forceMultipart' : false
			},

			'deleteFile' : {
				'enabled' : false
			},

			'editFilename' : {
				'enabled' : false
			},

			'validation' : {
				'allowedExtensions' : [ 'jpeg', 'jpg', 'gif', 'png' ],
				'acceptFiles'       : [ '.jpeg', '.jpg', '.gif', '.png' ],
				'sizeLimit'         : 3145728
			},

			'messages' : {
				'sizeError' : '{file} is too large, maximum file size is 3MB'
			},

			'showMessage' : function ( message ) {

				if ( message !== 'No files to upload.' ) {
					App.errorHandler( {
						'message' : message
					} );
				}

			}

		},

		'initUploader' : function () {
			this.ui.logo.fineUploader( this.uploadOptions );
			this.ui.banner.fineUploader( this.uploadOptions );
		},

		'uploadImages' : function ( group ) {
			var defer    = App.Deferred();
			var folder   = indexToChar( group.get( 'LicenseId' ) % 26 );
			var filename = folder + '/' + group.get( 'LicenseId' );

			App.when( this.uploadLogo( filename ), this.uploadBanner( filename ) )

			.done( function () {

				group.save( null, {

					'success' : function () {
						defer.resolve();
					},

					'error' : function () {
						defer.resolve();
					}

				} );

			} )

			.fail( function ( type ) {

				App.errorHandler( {
					'message' : 'An error occurred and the ' + type + ' image could not be uploaded'
				} );

				// although the images may not have uploaded successfully,
				// still resolve the deferred so that the group is created
				defer.resolve();

			} );

			return defer.promise();
		},

		'uploadLogo' : function ( filename ) {
			var defer = App.Deferred();
			filename += '_avatar';

			this.ui.logo.fineUploader( 'setParams', { 'newFilename' : filename } );
			this.ui.logo.fineUploader( 'setEndpoint', 'com/schoolimprovement/pd360/dao/groups/GroupAvatarUpload.cfc?method=Upload' );

			this.ui.logo.on( 'complete', function ( event, id, name, response ) {

				if ( response.success ) {
					var avatar = filename + '.' + name.split( '.' ).pop();

					this.model.set( 'Avatar', avatar );

					defer.resolve();
				}

			}.bind( this ) )

			.on( 'error', function ( event, id, name, errorReason ) {

				if ( errorReason === 'No files to upload.' ) {
					return defer.resolve();
				}

				defer.reject( 'logo' );

			} );

			this.ui.logo.fineUploader( 'uploadStoredFiles' );

			return defer.promise();
		},

		'uploadBanner' : function ( filename ) {
			var defer = App.Deferred();
			filename += '_banner';

			this.ui.banner.fineUploader( 'setParams', { 'newFilename' : filename } );
			this.ui.banner.fineUploader( 'setEndpoint', 'com/schoolimprovement/pd360/dao/groups/GroupBannerUpload.cfc?method=Upload' );

			this.ui.banner.on( 'complete', function ( event, id, name, response ) {

				if ( response.success ) {
					var brandingImage = filename + '.' + name.split( '.' ).pop();

					this.model.set( 'BrandingImage', brandingImage );

					defer.resolve();
				}

			}.bind( this ) )

			.on( 'error', function ( event, id, name, errorReason ) {

				if ( errorReason === 'No files to upload.' ) {
					return defer.resolve();
				}

				defer.reject( 'cover' );

			} );

			this.ui.banner.fineUploader( 'uploadStoredFiles' );

			return defer.promise();
		},

		'createGroupClicked' : function ( e ) {

			e.preventDefault();

			var persId = Session.personnelId();

			if ( !( ( this.model.get( 'LicenseName' ) === '' ) || ( this.model.get( 'Misc' ) === '' ) ) ) {

				var l = Ladda.create( document.querySelector( '.create' ) );
				l.start();

				var now = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss' );

				this.model.set( 'StartDate', now );
				this.model.set( 'Creator', persId );

				this.model.save( null, {

					'success' : function ( model, response, options ) {
						// Unfortunately now that the group has been created,
						// we have to then join it, and update the search index
						// so we can search for the group. Group images are also
						// uploaded during this time.
						App.when( model.join( persId ), model.updateSearchIndex(), this.uploadImages( model ) )
							.done( function () {

								l.stop();

								// Update licenses in flash for current user
								App.request( 'pd360:updateGroupsForUser' );

								App.navigate( 'groups/' + model.get( 'LicenseId' ), {
									'trigger' : true
								} );

							} );

					}.bind( this ),

					'error' : App.errorHandler.bind( App, {
						'messsage' : 'There was an issue creating the group.'
					} )

				} );
			}
		},

		'cancelCreateGroupClicked' : function () {
			App.navigate( 'groups', { 'trigger' : true } );
		}

	} );

} );
