define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );
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
			'input'   : 'input',
			'current' : '#current-password',
			'updated' : '#update-password',
			'verify'  : '#verify-password',
			'save'    : '#save-password'
		},

		'events' : {
			'blur @ui.input'  : 'validateInput',
			'keyup @ui.input' : 'validateInput',
			'click @ui.save'  : 'savePassword'
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

		'validateInput' : function ( event ) {
			require( 'common/helpers/validateInput')( event, this );
		},

		'savePassword' : function ( event ) {
			event.preventDefault();

			App.flashMessage.close();

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
							$( '#modal-content' ).modal( 'hide' );
							this.close();

							App.vent.trigger( 'flash:message', {
								'message' : 'Your password has been changed.',
								'type'    : 'success'
							} );
						} else {
							$( '.error-message' ).show();
						}

					}.bind( this ),

					'error' : function () {
						l.stop();

						App.vent.trigger( 'flash:message', {
							'message' : 'An error occurred. Please try again later.'
						} );
					}

				} );

			}

		}

	} );

} );
