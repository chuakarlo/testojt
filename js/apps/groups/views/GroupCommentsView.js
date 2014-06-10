define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Backbone   = require( 'backbone' );
	var Marionette = require( 'marionette' );
	var Session    = require( 'Session' );
	var $          = require( 'jquery' );
	var App        = require( 'App' );
	var moment     = require( 'moment' );

	var template           = require( 'text!../templates/groupCommentsView.html' );
	var usersTemplate      = require( 'text!../templates/usersGroupCommentsView.html' );
	var newsTemplate = require( 'text!../templates/NewsItemView.html');

	var GroupCommentView   = require( 'groups/views/GroupCommentView' );
	var MiniPersonnelModel = require( 'common/entities/MiniPersonnel');
	var MiniPersonnelView  = require( 'common/views/MiniPersonnel');
	var stripHtml          = require( 'common/helpers/stripHtml' );

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
			'click @ui.removeComment' : 'removeComment',
			'mouseenter @ui.creator'  : 'showMiniPersonnel'
		},

		'initialize' : function ( options ) {

			// grab the child collection from the parent model
			// so that we can render the collection as children
			// of this parent node
			this.collection = new App.Entities.WallCommentChildCollection(
				this.model.get( 'replies' )
			);

			// strip html before deciding whether to show goals section or not
			this.model.set( 'Message', stripHtml( this.model.get( 'Message' ) ) );

			this.user = options.user;

		},

		'onRender' : function () {
			// Do not allow replies to news items
			if ( this.model.get( 'NewsId' ) ) {
				this.ui.replyBox.hide();
			}

			$( this.el ).find( 'p.wallNews' ).prepend( autolinker.link( this.model.get( 'Message' ) ) );
		},

		'showMiniPersonnel' : function ( event ) {

			// We disable the event that just captured the mouseenter
			// and let the popover library handle the click so we
			// don't have to fetch the model or create the view every
			// time.
			$( this.el ).off( 'mouseenter', '.creator-name' );

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
				'trigger'   : 'hover',
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

			if ( this.ui.commentReply.val() === '' ) {

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
				'Message'         : this.ui.commentReply.val(),
				'Creator'         : Session.personnelId(),
				'CreatorAvatar'   : this.user.Avatar
			}, {
				'reply' : true
			} );

			replyModel.save(null, {

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

				}, this)
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

			'formatDate' : function ( date ) {

				// milliseconds in 24 hours
				var timeToSwitch = 60 * 60 * 24 * 1000;

				// Only show time ago for the first 24 hours
				if ( moment().diff( moment( date ) ) > timeToSwitch ) {
					return moment( date ).format( 'MMMM D, YYYY' );
				}

				return moment( date ).fromNow();

			}
		}

	} );

} );
