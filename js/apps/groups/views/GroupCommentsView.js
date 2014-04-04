define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var $                 = require( 'jquery' );
	var Vent              = require( 'Vent' );
	var Remoting          = require( 'Remoting' );
	var Session           = require( 'Session' );
	var template          = require( 'text!../templates/groupCommentsView.html' );
	var usersTemplate     = require( 'text!../templates/usersGroupCommentsView.html' );
	var GroupCommentView  = require( '../views/GroupCommentView' );
	var GroupCommentModel = require( '../models/CommentModel' );

	var path       = 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway';
	var objectPath = 'com.schoolimprovement.pd360.dao.groups.GroupMessages';

	return Marionette.CompositeView.extend( {

		'itemView'          : GroupCommentView,
		'itemViewContainer' : '.reply',
		'tagName'           : 'li',

		'ui' : {
			'message' : '.comment-reply'
		},

		'events' : {
			'click a#comment-reply'     : 'showComment',
			'click button.reply-submit' : 'replyComment',
			'click button#remove-main'  : 'removeComment'
	    },

		initialize: function () {
	        // grab the child collection from the parent model
	        // so that we can render the collection as children
	        // of this parent node
	        this.collection = this.model.replies;

	        Vent.on( 'group:removeReply', function ( model ) {
				this.collection.remove( model );
			}.bind( this ) );
	    },

	    appendHtml: function ( collectionView, itemView ) {
	        // ensure we nest the child list inside of
	        // the current list item
	        collectionView.$( '.reply' ).append( itemView.el );

	    },

	    getTemplate : function(){

			// add the remove button if user created the message
			if ( String( this.model.attributes.Creator ) === String( Session.personnelId() ) ){
				return _.template( usersTemplate );
			} else {
				return _.template( template );
			}

	    },

	    replyComment: function () {

			var maxMessageIdModel;

			// The backend needs the MessageId of the last message that it increments by one
			if ( this.model.replies.length > 0 ) {
				maxMessageIdModel = _.max( this.model.replies.models, function( model ) { return model.attributes.MessageId; } );
			} else {
				maxMessageIdModel = this.model;
			}

			var message = {};

			message.MessageThreadId = maxMessageIdModel.attributes.MessageThreadId;
			message.MessageId       = maxMessageIdModel.attributes.MessageId;
			message.LicenseId       = maxMessageIdModel.attributes.LicenseId;
			message.Message         = this.ui.message.val();
			message.Creator         = Session.personnelId();
			message.Created         = '';
			message.CreatorAvatar   = '';
			message.CreatorFullName = '';
			message.Remover         = 0;
			message.Removed         = '';

			var request = {
				'path'       : path,
				'objectPath' : objectPath,
				'method'     : 'respondToMessage',
				'args'       : message
			};

			var requests     = [ request ];
			var fetchingData = Remoting.fetch( requests );

			$.when( fetchingData ).done( function ( results ) {

				var groupCommentModel = new GroupCommentModel( message );
				this.collection.add( groupCommentModel );

			}.bind( this ) ).fail( function ( error ) {
				// TODO: error handling

			}.bind( this ) );

	    },

	    removeComment: function () {

			var message = {};

			message.MessageThreadId = this.model.attributes.MessageThreadId;
			message.MessageId       = this.model.attributes.MessageId;
			message.LicenseId       = this.model.attributes.LicenseId;
			message.Message         = this.model.attributes.Message;
			message.Creator         = this.model.attributes.Creator;
			message.Created         = this.model.attributes.Created;
			message.Remover         = this.model.attributes.Remover;
			message.Removed         = this.model.attributes.Removed;

			var request = {
				'path'       : path,
				'objectPath' : objectPath,
				'method'     : 'deleteByObj',
				'args'       : message
			};

			var requests     = [ request ];
			var fetchingData = Remoting.fetch( requests );

			$.when( fetchingData ).done( function ( results ) {

				Vent.trigger( 'group:removeComment', this.model );

			}.bind( this ) ).fail( function ( error ) {
				// TODO: error handling

			}.bind( this ) );

	    }

	} );

} );
