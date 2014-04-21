define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var Session    = require( 'Session' );
	var Backbone   = require( 'backbone' );

	var template = require( 'text!user/templates/settings/profile/password.html' );

	var Ladda = require( 'ladda' );

	require( 'validation' );
	require( 'backbone.stickit' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		'className' : 'modal-dialog modal-md',

		'ui' : {
			'form'    : '.form-container',
			'current' : '#current-password',
			'updated' : '#update-password',
			'verify'  : '#verify-password',
			'save'    : '#save-password',

			'invalid' : '.js-current',
			'success' : '.js-success'
		},

		'events' : {
			'click @ui.save' : 'savePassword'
		},

		'bindings' : {
			'#current-password' : 'Password',
			'#update-password'  : 'Updated',
			'#verify-password'  : 'Verify'
		},

		'initialize' : function () {
			Backbone.Validation.bind( this );
		},

		'onRender' : function () {
			this.stickit();
		},

		'savePassword' : function ( event ) {
			event.preventDefault();

			this.ui.invalid.addClass( 'hidden' );

			if ( this.model.isValid( true ) ) {

				var l = Ladda.create( document.querySelector( '#save-password' ) );
				l.start();

				var endpoint = '/com/schoolimprovement/pd360/dao/RespondService.cfc?method=ClientPersonnelPasswrdUpdtAPI&';
				var current  = this.ui.current.val();
				var verify   = this.ui.verify.val();

				var url = endpoint + $.param( {
					'personnelId'     : Session.personnelId(),
					'currentPassword' : current,
					'newPassword'     : verify
				} );

				$.ajax( {
					'url'      : url,
					'dataType' : 'json',

					'success' : function ( data, status, xhr ) {
						l.stop();

						if ( data.success ) {
							this.ui.form.addClass( 'hidden' );
							this.ui.save.addClass( 'hidden' );
							this.ui.success.removeClass( 'hidden' );
						} else {
							this.ui.invalid.removeClass( 'hidden' );
						}

					}.bind( this ),

					'error' : function () {
						// TODO: error handling
						l.stop();
					}
				} );
				
			}

		}

	} );
	
} );