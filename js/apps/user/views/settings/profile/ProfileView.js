define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );
	var async      = require( 'async' );

	var template      = require( 'text!user/templates/settings/profile/profile.html' );
	var PasswordModal = require( 'user/views/settings/profile/PasswordModal' );

	require( 'validation' );
	require( 'fine-uploader' );
	require( 'backbone.stickit' );

	var Ladda = require( 'ladda' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'tagName' : 'form',

		'ui' : {
			'firstname' : '#firstname',
			'lastname'  : '#lastname',
			'email'     : '#email',
			'title'     : '#title',
			'save'      : '#save',
			'uploader'  : '.fine-uploader',
			'password'  : '#change-password'
		},

		'attributes' : {
			'class' : 'form-container form-horizontal profile',
			'role'  : 'form'
		},

		'events' : {
			'click @ui.save'     : 'saveInfo',
			'click @ui.password' : 'changePassword'
		},

		'changePassword' : function ( event ) {
			event.preventDefault();

			var PasswordModel = Backbone.Model.extend( {

				'validation' : {

					'Password' : {
						'required' : true
					},

					'Updated' : [
						{
							'required'  : true,
							'msg'       : 'New password is required'
						},
						{
							'minLength' : 4,
							'msg'       : 'New password must be at least 4 characters'
						},
						{
							'fn' : function ( value, attr, computedState ) {
								if ( value === computedState.Password ) {
									return 'New password cannot be the current password';
								}
							}
						}
					],

					'Verify' : [
						{
							'required' : true,
							'msg'      : 'Re-typing password is required'
						},
						{
							'equalTo' : 'Updated',
							'msg'     : 'Passwords do not match'
						}
					]
				}
			} );

			var passwordModalView = new PasswordModal( {
				'model' : new PasswordModel()
			} );

			App.modalRegion.show( passwordModalView );
		},

		'initialize' : function ( options ) {
			this.gradeLevels  = options.grades;
			this.careerDates  = options.careerDates;
			this.roleTypes    = options.roleTypes;
			this.subjectTypes = options.subjects;
			this.profileModel = options.profileModel;

			Backbone.Validation.bind( this );
		},

		'serializeData' : function () {
			return {
				'personnel' : this.model.toJSON(),
				'profile'   : this.options.profileModel.toJSON()
			};
		},

		'onRender' : function () {

			this.initUploader();

			this.stickit( this.model, {
				'#email'     : 'EmailAddress',
				'#firstname' : 'FirstName',
				'#lastname'  : 'LastName',
				'#username'  : 'LoginName',
				'#country'   : 'Country',
				'#state'     : 'State',
				'#district'  : 'DistrictName'
			} );

			this.stickit( this.profileModel, {

				'#title' : 'Position',

				'#role-type' : {
					'observe' : 'EducatorType',
					'selectOptions' : {
						'collection' : this.roleTypes,
						'labelPath'  : 'EducatorTypeName',
						'valuePath'  : 'EducatorType',
						'defaultOption' : {
							'label' : 'Choose a role...',
							'value' : ''
						}
					}
				},
				
				'#career-start' : {
					'observe'       : 'ProfessionalStartDate',
					'onSet'         : 'setCareerStart',
					'onGet'         : 'getCareerStart',
					'selectOptions' : {
						'collection' : this.careerDates,
						'labelPath'  : 'year',
						'valuePath'  : 'year',
						'defaultOption' : {
							'label' : 'Choose a year...',
							'value' : 0
						}
					}
				},

				'#grade-level' : {
					'observe' : 'GradeLevelId',
					'selectOptions' : {
						'collection' : this.gradeLevels,
						'labelPath'  : 'GradeLevelName',
						'valuePath'  : 'GradeLevelId',
						'defaultOption' : {
							'label' : 'Choose a grade level...',
							'value' : 0
						}
					}
				},

				'#subject' : {
					'observe' : 'CCSubjectId',
					'selectOptions' : {
						'collection' : this.subjectTypes,
						'labelPath'  : 'CCSubjectName',
						'valuePath'  : 'CCSubjectId',
						'defaultOption' : {
							'label' : 'Choose a subject...',
							'value' : 0
						}
					}
				}

			} );

		},

		// ProfessionalStartDate is formated as a date but user can only select year
		'setCareerStart' : function ( val ) {
			if ( val !== '' ) {
				return val + '-01-01';
			}

			return val;
		},

		// ProfessionalStartDate is formated as a date but user can only select year
		'getCareerStart' : function ( val, options ) {
			if ( val && val !== '' ) {
				return Number( val.split( '-' ).shift() );
			}

			return val;
		},

		'initUploader' : function () {

			// the name of the file to store on akamai
			var filename = Session.personnelId() + '_' + Date.now();

			this.ui.uploader.fineUploader( {

				'multiple' : false,

				'text' : {
					'uploadButton' : '<a>Edit</a>'
				},


				'request' : {
					'params' : {
						'newFilename' : filename
					},

					'forceMultipart' : false,

					'endpoint' : 'com/schoolimprovement/pd360/dao/ProfileAvatarUpload.cfc?method=Upload'
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

					console.log( message );

				}

			} )

			.on( 'error', function () {
				// TODO: error handling
			} )

			.on( 'complete', function ( event, id, name ) {
				var avatar = filename + '.' + name.split( '.' ).pop();

				this.profileModel.set( 'Avatar', avatar );
				this.render();

			}.bind( this ) );
		},

		'saveInfo' : function ( event ) {
			event.preventDefault();

			// validation is only required on the view's model
			if ( this.model.isValid( true ) ) {

				var l = Ladda.create( document.querySelector( '#save' ) );
				l.start();

				async.series( [
				
					// save personnel model
					function ( callback ) {

						this.model.save( null, {

							'success' : function () {
								callback();
							},

							'error' : function ( error ) {
								callback( error );
							}

						} );

					}.bind( this ),
				
					// save profile model
					function ( callback ) {

						this.profileModel.save( null, {

							'success' : function () {
								callback();
							},

							'error' : function ( error ) {
								callback( error );
							}

						} );

					}.bind( this )
				
				], function ( error, results ) {
					l.stop();

					if ( error ) {
						App.vent.trigger( 'flash:message', {
							'message' : 'An error occurred and your information could not be saved',
							'type'    : 'error'
						} );

						return;
					}

					App.vent.trigger( 'flash:message', {
						'message' : 'Your profile information has been saved',
						'type'    : 'success'
					} );
					
					// update any changes to name, etc
					this.render();

				}.bind( this ) );

			}
		}

	} );

} );
