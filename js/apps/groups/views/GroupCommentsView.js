define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Remoting   = require( 'Remoting' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	var template           = require( 'text!../templates/groupCommentsView.html' );
	var usersTemplate      = require( 'text!../templates/usersGroupCommentsView.html' );
	var GroupCommentView   = require( '../views/GroupCommentView' );
	var GroupCommentModel  = require( '../models/CommentModel' );
	var MiniPersonnelModel = require('../../common/entities/MiniPersonnel');
	var MiniPersonnelView  = require('../../common/views/MiniPersonnel');
	var stripHtml          = require( 'common/helpers/stripHtml' );

	var path       = 'com.schoolimprovement.pd360.dao.groups.GroupMessagesGateway';
	var objectPath = 'com.schoolimprovement.pd360.dao.groups.GroupMessages';

	return Marionette.CompositeView.extend( {

		'itemView'          : GroupCommentView,
		'itemViewContainer' : '.reply',
		'tagName'           : 'li',

		'ui' : {
			'message'  : '.comment-reply',
			'creator'  : '.creator-name',
			'replyBox' : '#reply-box'
		},

		'events' : {
			'click a#comment-reply'  : 'showComment',
			'submit form'            : 'replyComment',
			'click a#remove-main'    : 'removeComment',
			'click @ui.creator'      : 'showMiniPersonnel',
			'mouseenter @ui.creator' : 'showMiniPersonnel',
			'mouseleave @ui.creator' : 'hideMiniPersonnel'
		},

		'initialize' : function ( options ) {

			// grab the child collection from the parent model
			// so that we can render the collection as children
			// of this parent node
			this.collection = this.model.replies;

			// strip html before deciding whether to show goals section or not
			this.model.attributes.Message = stripHtml( this.model.attributes.Message );

			this.user = options.user;

			Vent.on( 'group:removeReply', function ( model ) {
				this.collection.remove( model );
			}.bind( this ) );
		},

		'onRender' : function () {

			// Do not allow replies to news items
			if ( this.model.attributes.NewsId ) {
				this.ui.replyBox.hide();
			}

		},

		'showMiniPersonnel' : function ( event ) {

			// We disabled the event that just captured the click
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$( this.el ).off( 'click', '.creator-name' );

			var model = new MiniPersonnelModel( {
				'persId' : this.model.get( 'Creator' )
			} );

			var view = new MiniPersonnelView( {
				'model' : model
			} );

			// setup the popover
			this.ui.creator.popover( {
				'html'      : true,
				'placement' : 'top',
				'trigger'   : 'click',
				'content'   : function () {
					return view.render().el;
				}
			} );

			// Since spin.js requires element to be in the dom, wait until
			// the popover has been shown to add the spin icon.
			this.ui.creator.on( 'shown.bs.popover', function () {
				$(view.ui.spinner).spin();
			} );

			// Show the popover before we fetch the model, it should show a
			// loading view
			this.ui.creator.popover( 'show' );

			model.fetch( {
				'success' : _.bind( function ( model, res, options ) {
					// Render again once we have attributes
					view.render();
				}, this )
			} );
		},

		'hideMiniPersonnel' : function ( event ) {
			this.ui.creator.popover( 'hide' );
		},

		'onBeforeClose' : function () {
			// Make sure to destroy the popover events
			this.ui.creator.popover( 'destroy' );
		},

		'appendHtml' : function ( collectionView, itemView ) {

			// ensure we nest the child list inside of
			// the current list item
			collectionView.$( '.reply' ).append( itemView.el );

		},

		'getTemplate' : function () {

			// add the remove button if user created the message
			if ( String( this.model.attributes.Creator ) === String( Session.personnelId() ) ) {

				return _.template( usersTemplate );

			} else {

				return _.template( template );

			}

		},

		'replyComment' : function ( e ) {

			e.preventDefault();

			// The container div for the reply input
			var formGroup   = $( '#input-reply' + this.model.attributes.MessageThreadId ).parent();
			var formElement = $( '#input-reply' + this.model.attributes.MessageThreadId );

			// Error message displayed if reply message is blank
			if ( this.ui.message.val() === '' ) {

				var error = 'Reply is required';
				this.displayError( formGroup, error );

				return true;
			}

			var maxMessageIdModel;

			// The backend needs the MessageId of the last message that it increments by one
			if ( this.model.replies.length > 0 ) {
				maxMessageIdModel = _.max( this.model.replies.models, function ( model ) {
					return model.attributes.MessageId;
				} );
			} else {
				maxMessageIdModel = this.model;
			}

			var message = { };

			message.MessageThreadId = maxMessageIdModel.attributes.MessageThreadId;
			message.MessageId       = maxMessageIdModel.attributes.MessageId;
			message.LicenseId       = maxMessageIdModel.attributes.LicenseId;
			message.Message         = this.ui.message.val();
			message.Creator         = Session.personnelId();
			message.Created         = '';
			message.CreatorAvatar   = this.user.Avatar;
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

			App.when( fetchingData ).done( function ( results ) {

				this.clearForm( formGroup, formElement );

				var groupCommentModel = new GroupCommentModel( message );
				this.collection.add( groupCommentModel );

			}.bind( this ) ).fail( function () {
				// TODO: error handling

			}.bind( this ) );

		},

		clearForm : function ( formGroup, formElement ) {

			// removes errors from input
			formGroup.removeClass( 'has-error' );
			formGroup.find( '.help-block' ).remove();
			formElement.val('');

		},

		displayError : function ( formGroup, error ) {

			// add error to input
			formGroup.addClass( 'has-error' );
			formGroup.append(
				$( '<span/>' )
				.attr( 'class', 'help-block')
				.html( error )
			);

		},

		removeComment : function ( e ) {

			e.preventDefault();

			var message = { };

			message.MessageThreadId = this.model.attributes.MessageThreadId;
			message.MessageId       = this.model.attributes.MessageId;
			message.LicenseId       = this.model.attributes.LicenseId;
			message.Message         = this.model.attributes.Message;
			message.Creator         = this.model.attributes.Creator;
			message.CreatorAvatar   = this.model.attributes.CreatorAvatar;
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

			App.when( fetchingData ).done( function ( results ) {

				Vent.trigger( 'group:removeComment', this.model );

			}.bind( this ) ).fail( function () {
				// TODO: error handling

			}.bind( this ) );

		}

	} );

} );
