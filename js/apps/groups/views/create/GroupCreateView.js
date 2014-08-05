define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var Session    = require( 'Session' );

	var Ladda  = require( 'ladda' );
	var moment = require( 'moment' );

	var indexToChar = require( 'common/helpers/indexToChar' );
	var template    = require( 'text!groups/templates/create/groupCreateView.html' );

	require( 'backbone.stickit' );
	require( 'fine-uploader' );
	require( 'timezone' );

	return Marionette.ItemView.extend( {

		'template'   : _.template( template ),

		'className'  : 'groups-create',

		'events'    : {
			'click button.cancel-btn'  : 'cancelCreateGroupClicked',
			'click .create-btn'        : 'showConfirmationMessage',
			'submit form'              : 'createGroupClicked',
			'click .cancel-submit-btn' : 'cancelSubmit'
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
			'logo'                : '.logo-upload-select',
			'banner'              : '.banner-upload-select',
			'create'              : '.create',
			'confirmation'        : '.confirmation-options',
			'confirmationMessage' : '.confirmation-message',
			'createOptions'       : '.create-options',
			'cancelSubmit'        : '.cancel-submit-btn',
			'groupData'           : '.group-data',
			'groupInput'          : '.input-validation'
		},

		'toInt' : function ( val, options ) {
			val = parseInt( val );
			if ( val ) {
				return 1;
			}
			return 0;
		},

		'onDomRefresh' : function () {
			this.initUploader();
		},

		'onRender' : function () {
			this.stickit();
		},

		'uploadOptions' : {

			'multiple'   : false,
			'autoUpload' : false,

			'request' : {
				'forceMultipart' : false
			},

			'deleteFile' : {
				'enabled' : false
			},

			'validation' : {
				'allowedExtensions' : [ 'jpeg', 'jpg', 'gif', 'png' ],
				'acceptFiles'       : [ '.jpeg', '.jpg', '.gif', '.png' ],
				'sizeLimit'         : 3145728
			},

			'showMessage' : function ( message ) {

				if ( message !== 'No files to upload.' ) {
					App.errorHandler( new Error( message ) );
				}

			}

		},

		'initUploader' : function () {
			var logoTemplate = _.clone( this.uploadOptions );
			_.extend( logoTemplate, { 'template' : 'qq-logo-template' } );

			var bannerTemplate = _.clone( this.uploadOptions );
			_.extend( bannerTemplate, { 'template' : 'qq-banner-template' } );

			this.ui.logo.fineUploader( logoTemplate );
			this.ui.banner.fineUploader( bannerTemplate );
		},

		'uploadImages' : function ( group ) {
			var defer    = App.Deferred();
			var folder   = indexToChar( group.get( 'LicenseId' ) % 26 );
			var filename = folder + '/' + group.get( 'LicenseId' );

			// upload both images before saving group
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

				App.errorHandler( new Error( 'An error occurred and the ' + type + ' image could not be uploaded' ) ) ;

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

				// user didn't select a file, just set image to default
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

				// user didn't select a file, just set image to default
				if ( errorReason === 'No files to upload.' ) {
					return defer.resolve();
				}

				defer.reject( 'cover' );

			} );

			this.ui.banner.fineUploader( 'uploadStoredFiles' );

			return defer.promise();
		},

		'createGroupClicked' : function ( e ) {

			this.ui.cancelSubmit.addClass( 'disabled' );

			e.preventDefault();

			var persId = Session.personnelId();

			if ( !( ( this.model.get( 'LicenseName' ) === '' ) || ( this.model.get( 'Misc' ) === '' ) ) ) {

				var l = Ladda.create( document.querySelector( '.create' ) );

				l.start();
				var now = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss' );

				this.model.set( 'StartDate', now );
				this.model.set( 'Creator', persId );

				// temporary fix for multiline issues on Group description until the API is able to process multiline strings
				this.model.set( 'Misc', this.model.get( 'Misc' ).replace( /(\r\n|\n|\r)/gm, ' ' ) );

				this.model.save( null, {

					'success' : function ( model, response, options ) {
						// Unfortunately now that the group has been created,
						// we have to then join it, and update the search index
						// so we can search for the group. Group images are also
						// uploaded during this time.
						App.when(
							model.join( persId ),
							model.updateSearchIndex(),
							model.createPrivileges( persId ),
							this.uploadImages( model )
						)
							.done( function () {

								l.stop();

								// Update licenses in flash for current user
								App.request( 'pd360:updateGroupsForUser' );

								App.navigate( 'groups/' + model.get( 'LicenseId' ), {
									'trigger' : true
								} );

							} );

					}.bind( this ),

					'error' : App.errorHandler.bind( App, new Error( 'There was an issue creating the group.' ) )

				} );
			}
		},

		'showConfirmationMessage' : function ( e ) {

			if ( !( ( this.model.get( 'LicenseName' ).match( /^\s*$/ ) ) || ( this.model.get( 'Misc' ).match( /^\s*$/ ) ) ) ) {
				this.ui.groupInput.attr( 'disabled', true );
				this.ui.groupData.removeClass( 'has-error' );
				this.ui.confirmation.show();
				this.ui.confirmationMessage.show();
				this.ui.createOptions.hide();
			} else {

				this.ui.groupData.addClass( 'has-error' );

				App.errorHandler( new Error( 'Please fill out required fields' ) );
			}
		},

		'cancelSubmit' : function () {
			this.ui.groupInput.attr( 'disabled', false );
			this.ui.confirmation.hide();
			this.ui.confirmationMessage.hide();
			this.ui.createOptions.show();
		},

		'cancelCreateGroupClicked' : function () {
			App.navigate( 'groups', { 'trigger' : true } );
		}

	} );

} );
