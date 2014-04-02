define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var template   = require( 'text!user/templates/settings/personalInfo.html' );
	var _          = require( 'underscore' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'settings',

		'id' : 'personal-info',

		'ui' : {
			'firstname' : '#firstname',
			'lastname'  : '#lastname',
			'email'     : '#email',
			'save'      : '#save'
		},

		'events' : {
			'click @ui.save' : 'saveInfo'
		},

		'saveInfo' : function () {
			this.model.set( 'FirstName', this.ui.firstname.val() );
			this.model.set( 'LastName', this.ui.lastname.val() );
			this.model.set( 'EmailAddress', this.ui.email.val() );

			this.model.save();
		},

		'setPersonnelModel' : function ( model ) {
			this.personnelModel = model;
		},

		// Currently, City is not saved on the ClientPersonnel object
		'templateHelpers' : function () {

			return {

				'City' : ''

			};

		}

	} );

} );
