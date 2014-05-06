define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	var GroupCommentModel = require( '../models/CommentModel' );
	var template          = require( 'text!../templates/groupCommentCreateView.html' );
	var path              = 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway';
	var objectPath        = 'com.schoolimprovement.pd360.dao.groups.GroupMessages';

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

			var message = { };

			message.MessageThreadId = 0;
			message.MessageId       = 1;
			message.LicenseId       = this.model.attributes.LicenseId;
			message.Message         = String( this.ui.commentCreate.val() );
			message.Creator         = Session.personnelId();
			message.Created         = '';
			message.CreatorAvatar   = this.user.Avatar;
			message.CreatorFullName = '';
			message.Remover         = '';
			message.Removed         = '';

			var request = {
				'path'       : path,
				'objectPath' : objectPath,
				'method'     : 'createNewMessage',
				'args'       : message
			};

			var requests     = [ request ];
			var fetchingData = Remoting.fetch( requests );

			App.when( fetchingData ).done( function ( results ) {

				this.clearForm();

				var groupCommentModel = new GroupCommentModel( message );
				Vent.trigger( 'group:createComment', groupCommentModel );

			}.bind( this ) ).fail( function () {
				// TODO: error handling

			} );

		},

		'clearForm' : function () {
			// removes comment from textarea
			this.ui.commentCreate.val( '' );
		}

	} );

} );
