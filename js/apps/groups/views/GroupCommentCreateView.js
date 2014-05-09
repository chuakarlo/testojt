define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );

	var template  = require( 'text!../templates/groupCommentCreateView.html' );
	var stripHtml = require( 'common/helpers/stripHtml' );

	require( 'groups/entities/WallCommentModel');

	return Marionette.ItemView.extend( {

		'template'  : _.template( template ),
		'className' : 'row',

		'ui' : {
			'commentCreate' : '#comment-create'
		},

		'events' : {
			'submit form' : 'createComment'
		},

		'initialize' : function ( options ) {
			this.user = options.user;
		},

		'createComment' : function ( e ) {

			e.preventDefault();

			var msg = String( stripHtml( this.ui.commentCreate.val() ) );

			if ( msg === '' ) {
				this.showInputError( 'Must contain a message' );
				return;
			}

			var model = new App.Entities.WallCommentModel( {
				'MessageThreadId' : 0,
				'MessageId'       : 1,
				'LicenseId'       : this.model.get( 'LicenseId'),
				'Message'         : msg,
				'Creator'         : Session.personnelId(0),
				'CreatorAvatar'   : this.user.Avatar
			} );

			model.save( null, {
				'success' : _.bind( function () {
					this.clearForm();

					var options = {
						'startRow' : 0,
						'numRows'  : 1
					};

					App.vent.trigger( 'groups:newCommentFetch', options );

				}, this ),

				'error' : function () {
					var msg = 'An error occurred while saving your comment. ' +
					'Please try again later.';
					App.vent.trigger( 'flash:message', {
						'message' : msg
					} );
				}
			} );

		},

		'clearForm' : function () {
			// removes comment from textarea
			this.ui.commentCreate.val( '' );
			this.clearInputError();
		},

		'showInputError' : function ( msg ) {
			var invalid = Backbone.Validation.callbacks.invalid;
			invalid( this, 'comment-create', msg, 'name' );
		},

		'clearInputError' : function () {
			var valid = Backbone.Validation.callbacks.valid;
			valid( this, 'comment-create', 'name' );
		}

	} );

} );
