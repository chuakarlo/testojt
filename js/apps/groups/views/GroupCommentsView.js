define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var App        = require( 'App' );
	var utils      = require( 'videoPlayer/utils/utils' );

	var moment = require( 'moment' );
	require( 'moment-timezone' );
	require( 'timezone' );

	var template      = require( 'text!../templates/groupCommentsView.html' );
	var usersTemplate = require( 'text!../templates/usersGroupCommentsView.html' );
	var newsTemplate  = require( 'text!../templates/NewsItemView.html' );

	var GroupCommentView   = require( 'groups/views/GroupCommentView' );
	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel' );
	var MiniPersonnelView  = require( 'common/views/MiniPersonnel' );
	var stripHtml          = require( 'common/helpers/stripHtml' );
	var groupUtils              = require( 'groups/utils/utils' );

	var Autolinker = require( 'autolinker' );

	var autolinker = new Autolinker( {
		newWindow   : false,
		stripPrefix : false,
		className   : 'link'
	} );

	return Marionette.CompositeView.extend( {

		'itemView'          : GroupCommentView,
		'itemViewContainer' : '.reply',
		'tagName'           : 'li',

		'ui' : {
			'commentReply'  : '.comment-reply',
			'removeComment' : '.remove-parent',
			'creator'       : '.creator-name',
			'replyBox'      : '.reply-box'
		},

		'events' : {
			'submit form'             : 'replyComment',
			'click @ui.removeComment' : 'removeComment'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			// grab the child collection from the parent model
			// so that we can render the collection as children
			// of this parent node
			this.collection = new App.Entities.WallCommentChildCollection(
				this.model.get( 'replies' )
			);
			this.model.set( 'Avatar', this.options.groupAvatar );
			this.user = options.user;

			this.personelModel = new MiniPersonnelModel( {
				'persId' : this.model.get( 'Creator' )
			} );

			this.personelView = new MiniPersonnelView( {
				'model' : this.personelModel
			} );
		},

		'onRender' : function () {
			// Do not allow replies to news items
			if ( this.model.get( 'NewsId' ) ) {
				this.ui.replyBox.hide();
			}
		},

		'closePopovers' : function ( viewWithPopover ) {
			// This will close any popovers on other children views for this
			// collection view
			if ( this !== viewWithPopover ) {
				if ( this.ui.creator.next( 'div.popover:visible' ).length ) {
					this.ui.creator.popover( 'hide' );
				}
			}

			this.children.each( function ( c ) {
				if ( c !== viewWithPopover ) {
					// We have to actually check to see if it's visible instead
					// of just calling hide
					if ( c.ui.creator.next( 'div.popover:visible' ).length ) {
						c.ui.creator.popover( 'hide' );
					}
				}
			} );
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

			if ( this.model.get( 'NewsEntry' ) ) {
				return _.template( newsTemplate );
			}
			// add the remove button if user created the message
			if ( String( this.model.get( 'Creator' ) ) === String( Session.personnelId() ) ) {

				return _.template( usersTemplate );

			} else {

				return _.template( template );

			}

		},

		'replyComment' : function ( e ) {

			e.preventDefault();

			var msg = this.ui.commentReply.val();
			if ( msg === '' || !msg.replace( / /g,'' ).length ) {

				var error = 'Reply is required';
				this.showInputError( error );
				return;
			}

			var lastComment = this.collection.last();

			if ( !lastComment ) {
				lastComment = this.model;
			}

			// The backend requires some of the attributes from the last
			// comment in order to create a new comment.
			var replyModel = new App.Entities.WallCommentModel( {
				'MessageThreadId' : lastComment.get( 'MessageThreadId' ),
				'MessageId'       : lastComment.get( 'MessageId' ),
				'LicenseId'       : lastComment.get( 'LicenseId' ),
				'Message'         : stripHtml( this.ui.commentReply.val() ),
				'Creator'         : Session.personnelId(),
				'CreatorAvatar'   : this.user.Avatar
			}, {
				'reply' : true
			} );

			replyModel.save( null, {

				'success' : _.bind( function () {

					// We have to figure out where to start the query
					this.model.collection.getComputedPosition( this.model );
					var computedModelIndex = this.model.collection.computedPosition;

					var successCb = _.bind( function () {
						this.collection.set( this.model.get( 'replies' ) );
						this.clearForm();
					}, this );

					var options = {
						'startRow'  : computedModelIndex,
						'numRows'   : 1,
						'successCb' : successCb
					};

					this.model.collection.newCommentFetch( options );

				}, this )
			} );

		},

		removeComment : function ( ) {
			this.model.destroy();
		},

		'clearForm' : function () {
			// removes comment from textarea
			this.ui.commentReply.val( '' );
			this.clearInputError();
		},

		'showInputError' : function ( msg ) {
			var invalid = Backbone.Validation.callbacks.invalid;
			invalid( this, 'comment-reply', msg, 'name' );
		},

		'clearInputError' : function () {
			var valid = Backbone.Validation.callbacks.valid;
			valid( this, 'comment-reply', 'name' );
		},

		'templateHelpers' : {
			'getUserAvatarPath' : require( 'common/helpers/getUserAvatarPath' ),
			'getAvatarPath'     : require( 'common/helpers/getAvatarPath' ),

			'formatDate' : function ( date ) {
				var server = 'MST7MDT';

				// milliseconds in 24 hours
				var timeToSwitch = 60 * 60 * 24 * 1000;

				// Only show time ago for the first 24 hours
				if ( moment().diff( moment.tz( date, server ) ) > timeToSwitch ) {
					return moment.tz( date , server ).format( 'MMMM D, YYYY' );
				}

				return moment.tz( date, server ).fromNow();

			},

			'getWallMessage' : function () {
				// Replacing /%nl%/ string pattern to make newline.
				var message = _.unescape( utils.safeStringify( this.Message ).replace( /%nl%/g, '\n' ) );

				return autolinker.link( _.escape( message ) );
			},

			'getNewsEntry' : function () {
				return autolinker.link( groupUtils.doubleUnescape( this.NewsEntry ) );
			}
		}

	} );

} );
