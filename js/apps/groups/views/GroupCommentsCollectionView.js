define( function ( require ) {
	'use strict';

	var _                 = require( 'underscore' );
	var $                 = require( 'jquery' );
	var Backbone          = require( 'backbone' );
	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var Session           = require( 'Session' );
	var GroupCommentsView = require( '../views/GroupCommentsView' );
	var template          = require( 'text!../templates/GroupCommentsCollection.html' );
	var stripHtml         = require( 'common/helpers/stripHtml' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),

		'itemView'          : GroupCommentsView,

		'ui' : {
			'commentCreateContainer' : '.comment-create-container',
			'commentCreate'          : '#comment-create'
		},

		'events' : {
			'submit #comment-create-form' : 'createComment'
		},
		// Replying to a comment needs the user avatar
		'itemViewOptions' : function ( options ) {
			return {
				user : this.user
			};
		},

		'initialize' : function ( options ) {
			this.user = options.user;

			this.listenTo( App.vent, 'show:popover', this.closePopovers );
			// this.on( 'itemview:show:popover', this.closePopovers );
		},

		'closePopovers' : function ( viewWithPopover ) {
			// This will close any popovers on other children views for this
			// collection view
			this.children.each( function ( c ) {
				c.closePopovers( viewWithPopover );
			} );
		},

		'appendHtml' : function ( collectionView, itemView, index ) {
			// This is kind of hacky but it lets us insert new comments at the
			// top of the collection view.
			if ( this.collection.first() === itemView.model ) {
				$( '.comments-list', collectionView.$el ).prepend( itemView.el );
			} else {
				$( '.comments-list', collectionView.$el ).append( itemView.el );
			}
		},

		'showCreateSection' : function () {
			this.ui.commentCreateContainer.toggle();
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
				'LicenseId'       : this.model.get( 'LicenseId' ),
				'Message'         : msg,
				'Creator'         : Session.personnelId( 0 ),
				'CreatorAvatar'   : this.user.Avatar
			} );

			model.save( null, {
				'success' : _.bind( function () {
					this.clearForm();

					var options = {
						'startRow' : 0,
						'numRows'  : 1
					};

					this.collection.newCommentFetch( options );

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
