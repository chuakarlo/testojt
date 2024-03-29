define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var App        = require( 'App' );
	var Ladda      = require( 'ladda' );
	var moment     = require( 'moment' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var yesNoHack  = require( 'common/helpers/yesNoHack' );

	var template = require( 'text!user/templates/register/registerLayout.html' );

	require( 'validation' );
	require( 'backbone.stickit' );
	require( 'timezone' );

	Backbone.Validation.configure( {
		'forceUpdate' : true
	} );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'eulaRegion' : '#eula-content'
		},

		'events' : {
			'blur @ui.input'      : 'validateInput',
			'keyup @ui.input'     : 'validateInput',
			'change @ui.agree'    : 'toggleAcceptButton',
			'submit'              : 'register',
			'change @ui.email'    : 'checkEmail',
			'change @ui.country'  : 'updateStates',
			'change @ui.state'    : 'updateDistricts',
			'change @ui.district' : 'updateSchools'
		},

		'ui' : {
			'input'    : 'input',
			'agree'    : '#agree-cb',
			'register' : '#register-button',
			'email'    : 'input[name=EmailAddress]',
			'country'  : '[name="Country"]',
			'state'    : '[name="State"]',
			'district' : '[name=DistrictName]',
			'school'   : '[name="ClientId"]',
			'password' : '[name="Password"]'
		},

		// The 'other' ids for that have special handling
		'other' : {
			'country'  : 'OTHER COUNTRY',
			'state'    : 'AA',
			'district' : '360-452716',
			'school'   : '456188'
		},

		// Backbone.stickit data bindings
		'bindings' : {
			'[name="FirstName"]'    : 'FirstName',
			'[name="LastName"]'     : 'LastName',
			'[name="EmailAddress"]' : 'EmailAddress',
			'#verify-email'         : 'EmailAddress',
			'[name="Password"]'     : {
				'observe'    : 'Password',
				'setOptions' : {
					validate : true
				}
			},
			'[name="Password2"]'    : 'Password2',
			'[name="Title"]'        : 'Title',
			'[name="WorkPhone"]'    : 'WorkPhone',

			'[name="Country"]' : {
				'observe'       : 'Country',
				'selectOptions' : {
					'collection' : [
						{ 'value' : '', 'label' : 'Choose a country...' },
						{ 'value' : 'US', 'label' : 'United States' },
						{ 'value' : 'CAN', 'label' : 'Canada' },
						{ 'value' : 'OTHER COUNTRY', 'label' : 'OTHER COUNTRY' }
					]
				}
			},

			'[name="State"]' : {
				'observe'       : 'State',
				'selectOptions' : {
					'collection' : [ ],
					'labelPath'  : 'label',
					'valuePath'  : 'value'
				}
			},

			'[name="DistrictName"]' : {
				'observe'       : 'DistrictName',
				'selectOptions' : {
					'collection' : [
						{ 'value' : '', 'label' : 'Choose a district...' },
						{ 'value' : '360-452716', 'label' : 'OTHER DISTRICT' }
					]
				}
			},

			'[name="ClientId"]' : {
				'observe'       : 'ClientId',
				'selectOptions' : {
					'collection' : [
						{ 'value' : '', 'label' : 'Choose a school...' },
						{ 'value' : '456188', 'label' : 'OTHER SCHOOL' }
					]
				}
			}
		},

		'onRender' : function () {

			this.stickit();

			var states = new App.Entities.States();
			states.fetch( {

				'success' : ( function ( collection, response, options ) {

					this.addBinding( null, {
						'[name="State"]' : {
							'observe'       : 'State',
							'selectOptions' : {
								'collection' : states
							},
							'defaultOption' : {
								'label' : 'Choose a state...',
								'value' : null
							}
						}
					} );
				} ).bind( this )
			} );

		},

		'initialize' : function ( options ) {

			this.model.setupRegistrationValidation();

			Backbone.Validation.bind( this );

		},

		'checkEmail' : function ( event ) {

			if ( this.model.isValid( [ 'EmailAddress' ] ) ) {

				this.ui.email.prop( 'disabled', true );

				var usedRequest = App.request( 'user:byEmail', this.ui.email.val() );

				this.showFlashMessage( 'checkingEmail' );

				App.when( usedRequest ).done( function ( used ) {

					this.showFlashMessage( 'emailNotUsed' );

					if ( used.length > 2 ) {
						this.showFlashMessage( 'emailUsed' );
					}

				}.bind( this ) ).fail( function () {

					this.showFlashMessage( 'fetchingEmailError' );

				}.bind( this ) ).always( function () {

					this.ui.email.prop( 'disabled', false );

				}.bind( this ) );

			}

		},

		'toggleAcceptButton' : function ( event ) {

			this.model.set( 'LicenseAccepted', '' );
			this.model.set( 'LicenseInitials', '' );
			this.ui.register.prop( 'disabled', true );

			if ( this.ui.agree.is( ':checked' ) ) {
				var now = moment().tz( 'MST7MDT' ).format( 'MMMM D, YYYY H:mm:ss' );

				this.model.set( 'LicenseAccepted', now );
				this.model.set( 'LicenseInitials', 'created' );
				this.ui.register.prop( 'disabled', false );
			}

		},

		'validateInput' : function ( event ) {
			require( 'common/helpers/validateInput' )( event, this );
		},

		'disableSelect' : function ( element ) {
			element.val( '' ).trigger( 'change' ).prop( 'disabled', true );
		},

		'forceOther' : function ( element, otherOption ) {
			element.val( otherOption ).trigger( 'change' ).prop( 'disabled' , true );
		},

		'populateSelect' : function ( element ) {

			App.flashMessage.close();

			element.hide();
			element.prop( 'disabled', false );

		},

		'populateDistricts' : function ( element, id ) {
			this.populateSelect( element );

			var districtRequest = App.request( 'common:districts', id );

			App.when( districtRequest ).done( function ( districts ) {

				this.addBinding( null, {
					'[name="DistrictName"]' : {
						'observe'       : 'DistrictName',
						'selectOptions' : {
							'collection' : districts
						},
						'defaultOption' : {
							'label' : 'Choose a district...',
							'value' : null
						}
					}
				} );

				this.ui.district.show();

			}.bind( this ) ).fail( function ( error ) {

				this.showFlashMessage( 'fetchingDistrictsError' );

			}.bind( this ) );
		},

		'populateSchools' : function ( element, id ) {
			this.populateSelect( element );

			var schoolsRequest = App.request( 'common:schools', id );

			App.when( schoolsRequest ).done( function ( schools ) {

				this.addBinding( null, {
					'[name="ClientId"]' : {
						'observe'       : 'ClientId',
						'selectOptions' : {
							'collection' : schools
						}
					}
				} );

				this.ui.school.show();

			}.bind ( this ) ).fail( function ( error ) {

				this.showFlashMessage( 'fetchingSchoolsError' );

			}.bind( this ) );
		},

		'updateStates' : function ( event ) {
			var countryOption = this.ui.country.val();

			if ( countryOption === '' ) {
				this.disableSelect( this.ui.state );
			} else if ( countryOption === this.other.country ) {
				this.forceOther( this.ui.state, this.other.state );
			} else {
				this.populateSelect( this.ui.state );
				this.ui.state.show();
			}

			this.updateDistricts( event );
		},

		'updateDistricts' : function ( event ) {
			var stateOption = this.ui.state.val();

			if ( stateOption === '' ) {
				this.disableSelect( this.ui.district );
			} else if ( stateOption === this.other.state ) {
				this.forceOther( this.ui.district, this.other.district );
			} else {
				this.populateDistricts( this.ui.district, this.ui.state.val() );
			}

			this.updateSchools( event );
		},

		'updateSchools' : function ( event ) {
			var districtOption = this.ui.district.val();
			var otherDistrict  = this.other.district.toString();

			var dist = { };

			dist[ '' ] = function () {
				this.disableSelect( this.ui.school );
			};

			dist[ otherDistrict ] = function () {
				this.forceOther( this.ui.school, this.other.school );
			};

			if ( dist.hasOwnProperty( districtOption ) ) {
				return dist[ districtOption ].call( this );
			}

			this.populateSchools( this.ui.school, this.ui.district.val() );

		},

		'register' : function ( event ) {
			event.preventDefault();

			if ( this.model.isValid( true ) && !App.request( 'session:authenticated' ) ) {
				var l = Ladda.create( document.querySelector( '#register-button' ) );
				l.start();

				// override element values since we save the label instead of the ID
				this.model.attributes.State        = this.ui.state.find( 'option:selected' ).text();
				this.model.attributes.DistrictName = this.ui.district.find( 'option:selected' ).text();
				this.model.attributes.Organization = this.ui.school.find( 'option:selected' ).text();

				// Handle Yes/No saved to ColdFusion
				yesNoHack( this.model.attributes );

				var url = '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=RespondCreateUser&' + $.param( this.model.attributes );

				$.ajax( {
					'url' : url
				} ).done( function ( data, textStatus, jqXHR ) {

					this.showFlashMessage( 'creationSuccess', { 'email' : this.model.get( 'EmailAddress' ) } );

					if ( data === '\"email address already in use\"' ) {
						this.showFlashMessage( 'emailUsed' );
					}

				}.bind( this ) ).fail( function () {

					this.showFlashMessage( 'creationError' );

				}.bind( this ) ).always( function () {

					l.stop();

				} );

			} else {
				this.showFlashMessage( 'invalidForm' );
			}
		},

		'showFlashMessage' : function ( message, option ) {

			option = option || { };

			var messages = {

				'emailUsed' : {
					'message' : 'The e-mail (' + this.ui.email.val() + ') is already in use. Your school / district may have already set up your account.<br>Please try to reset your <a href="/#forgotPassword">password</a>.'
				},

				'emailNotUsed' : {
					'message' : 'The e-mail (' + this.ui.email.val() + ') is not currently in use.',
					'type'    : 'success'
				},

				'fetchingEmailError' : {
					'message' : 'An error occurred checking email.'
				},

				'checkingEmail' : {
					'message' : 'Checking e-mail (' + this.ui.email.val() + ') to see if it is already in use.',
					'type'    : 'warning',
					'timeout' : false
				},

				'creationError' : {
					'message' : 'There has been an error creating your account. Please try again.'
				},

				'creationSuccess' : {
					'message' : 'Before registration is complete you need to validate your account by following the instructions emailed to ' + option.email + '. After validation you will be able to <a href="/#login">login</a>.',
					'type'    : 'success',
					'timeout' : false
				},

				'fetchingDistrictsError' : {
					'message' : 'An error occurred fetching districts. Please try again later.'
				},

				'fetchingSchoolsError' : {
					'message' : 'An error occurred fetching schools. Please try again later.'
				},

				'invalidForm' : {
					'message' : 'Please correct invalid form entries.'
				}

			};

			App.vent.trigger( 'flash:message' , messages[ message ] );
		}

	} );

} );
