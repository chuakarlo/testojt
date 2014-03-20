define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var UserModel  = require( 'user/models/UserModel' );
	var Remoting   = require( 'Remoting' );
	var template   = require( 'text!user/templates/settings/personalInfo.html' );
	var Session    = require( 'Session' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );

	var path       = 'com.schoolimprovement.pd360.dao.core.ClientPersonnelGateway';
	var objectPath = 'com.schoolimprovement.pd360.dao.core.ClientPersonnel';

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'settings',

		'id' : 'personal-info',

		'ui' : {
			'firstname' : '#firstname',
			'lastname'  : '#lastname',
			'email'     : '#email',
			'username'  : '#username',
			'district'  : '#district',
			'country'   : '#country',
			'state'     : '#state',
			'city'      : '#city',
			'save'      : '#save'
		},

		'events' : {
			'click @ui.save' : 'saveInfo'
		},

		'saveInfo' : function () {
			var model = this.personnelModel;

			model.FirstName    = this.ui.firstname.val();
			model.LastName     = this.ui.lastname.val();
			model.EmailAddress = this.ui.email.val();

			var request = {
				'path'       : path,
				'objectPath' : objectPath,
				'method'     : 'update',
				'args'       : model
			};

			var saving = Remoting.fetch( request );

			$.when( saving ).done( function ( model ) {

				this.trigger( 'model:change' );

			}.bind( this ) ).fail( function ( error ) {

				// TODO: error handling
				
			}.bind( this ) );
		},

		'setPersonnelModel' : function ( model ) {
			this.personnelModel = model;
		},

		// Currently, City is not saved on the ClientPersonnel object
		'templateHelpers' : function () {

			return {

				'EmailAddress' : this.personnelModel.EmailAddress,
				'DistrictName' : this.personnelModel.DistrictName,
				'LoginName'    : this.personnelModel.LoginName,
				'FirstName'    : this.personnelModel.FirstName,
				'LastName'     : this.personnelModel.LastName,
				'Country'      : this.personnelModel.Country,
				'State'        : this.personnelModel.State,
				'City'         : ''

			};

		}

	} );

} );
