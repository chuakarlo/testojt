define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var App        = require( 'App' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	var template = require( 'text!user/templates/register/registerLayout.html' );

	require( 'validation' );
	require( 'backbone.stickit' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'eulaRegion' : '#eula-content'
		},

		'events' : {
			'submit'              : 'register',
			'change @ui.email'    : 'checkEmail',
			'change @ui.country'  : 'updateStates',
			'change @ui.state'    : 'updateDistricts',
			'change @ui.district' : 'updateSchools'
		},

		'ui' : {
			'email'    : 'input[name=EmailAddress]',
			'country'  : '[name="Country"]',
			'state'    : '[name="State"]',
			'district' : '[name=DistrictName]',
			'school'   : '[name="ClientId"]'
		},

		// The 'other' ids for that have special handling
		'other' : {
			'country'  : 'OTHER COUNTRY',
			'state'    : 'AA',
			'district' : '360-452716',
			'school'   : '455134'
		},

		// Backbone.stickit data bindings
		'bindings' : {
			'[name="FirstName"]'    : 'FirstName',
			'[name="LastName"]'     : 'LastName',
			'[name="EmailAddress"]' : 'EmailAddress',
			'#verify-email'         : 'EmailAddress',
			'[name="Password"]'     : 'Password',
			'[name="Password2"]'    : 'Password2',

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
						{ 'value' : '455134', 'label' : 'OTHER SCHOOL' }
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

				var that = this;

				var usedRequest = App.request( 'user:byEmail', this.ui.email.val() );

				this.ui.email.hide();
				$( '.alert-warning.js-email' ).removeClass( 'hidden' );

				App.when( usedRequest ).done( function ( used ) {

					if ( used.length > 2 ) {
						$( '.alert-danger.js-email' ).removeClass( 'hidden' );
					} else {
						$( '.alert-danger.js-email' ).addClass( 'hidden' );
					}

					that.ui.email.show();
					$( '.alert-warning' ).addClass( 'hidden' );

				} );

			}

		},

		'disableSelect' : function ( element ) {
			element.val( '' ).trigger( 'change' ).prop( 'disabled', true );
		},

		'forceOther' : function ( element, otherOption ) {
			element.val( otherOption ).trigger( 'change' ).prop( 'disabled' , true );
		},

		'populateSelect' : function ( element, id ) {

			var that = this;

			element.hide();

			var name = element.attr( 'name' );

			if ( name === 'DistrictName' ) {

				var districtRequest = App.request( 'common:districts', id );

				App.when( districtRequest ).done( function ( districts ) {

					that.addBinding( null, {
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

					element.show();

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			} else if ( name === 'ClientId' ) {

				var schoolsRequest = App.request( 'common:schools', id );

				App.when( schoolsRequest ).done( function ( schools ) {

					that.addBinding( null, {
						'[name="ClientId"]' : {
							'observe'       : 'ClientId',
							'selectOptions' : {
								'collection' : schools
							}
						}
					} );

					element.show();

				} ).fail( function ( error ) {
					// TODO: error handling
				} );

			} else {
				element.show();
			}

			element.prop( 'disabled', false );

		},

		'updateStates' : function ( event ) {
			var countryOption = this.ui.country.val();

			if ( countryOption === '' ) {
				this.disableSelect( this.ui.state );
			} else if ( countryOption === this.other.country ) {
				this.forceOther( this.ui.state, this.other.state );
			} else {
				this.populateSelect( this.ui.state );
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
				this.populateSelect( this.ui.district, this.ui.state.val() );
			}

			this.updateSchools( event );
		},

		'updateSchools' : function ( event ) {
			var districtOption = this.ui.district.val();

			if ( districtOption === '' ) {
				this.disableSelect( this.ui.school );
			} else if ( districtOption === this.other.district ) {
				this.forceOther( this.ui.school, this.other.school );
			} else {
				this.populateSelect( this.ui.school, this.ui.district.val() );
			}

		},

		'register' : function ( event ) {
			event.preventDefault();

			if ( this.model.isValid( true ) ) {

				// override element values since we save the label instead of the ID
				this.model.attributes.State        = this.ui.state.find( 'option:selected' ).text();
				this.model.attributes.DistrictName = this.ui.district.find( 'option:selected' ).text();
				this.model.attributes.Organization = this.ui.school.find( 'option:selected' ).text();

				var url = '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=RespondCreateUser&' + $.param( this.model.attributes );

				$( 'form' ).hide();
				$( '.js-process' ).addClass( 'hidden' );
				$( '.js-submitting' ).removeClass( 'hidden' );

				$.ajax( {
					'url' : url
				} ).done( function ( data, textStatus, jqXHR ) {

					if ( data === '\"email address already in use\"' ) {
						$( 'form' ).show();
						$( '.js-process' ).addClass( 'hidden' );
						$( '.js-fail' ).removeClass( 'hidden' );

					} else {
						$( '.js-process' ).addClass( 'hidden' );
						$( '.js-complete' ).removeClass( 'hidden' );
					}

				} ).fail( function () {
					// TODO: error handling
					$( 'form' ).show();
					$( '.js-process' ).addClass( 'hidden' );
					$( '.js-fail' ).removeClass( 'hidden' );
				} );

			}
		}

	} );

} );
