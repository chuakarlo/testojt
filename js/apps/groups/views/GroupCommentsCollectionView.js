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
		// Transfered some of the itemView methods to avoid cyclomatic complexity
		'itemViewOptions' : function ( options ) {
			return {
				'user'        : this.user,
				'groupAvatar' : this.groupAvatar,

				'onShow' : function () {
					this.showMiniPersonnel();
				},

				'onClose' : function () {
					this.ui.creator.popover( 'destroy' );
					this.ui.creator.off( 'click' );
					$( this.personelView.ui.spinner ).spin( false );
					this.personelModel = null;
					this.personelView  = null;
				},

				'showMiniPersonnel' : function ( event ) {
					this.ui.creator.popover( {
						'html'      : true,
						'placement' : 'top',
						'trigger'   : 'click',
						'content'   : function () {
							return this.personelView.render().el;
						}.bind( this )
					} );

					this.listenTo( this.personelView, 'close', function ( event ) {
						this.ui.creator.popover( 'hide' );
					}.bind( this ) );

					this.ui.creator.on( 'shown.bs.popover', _.bind( function ( ev ) {
						if ( $( ev.currentTarget ).attr( 'clicked' ) !== 'true' ) {
							$( this.personelView.ui.spinner ).spin();
							this.personelModel.fetch( {
								'success' : _.bind( function ( model, res, options ) {
									// Render again once we have attributes
									this.personelView.render();
									$( ev.currentTarget ).attr( 'clicked', true );
								}, this )
							} );
						}
						App.vent.trigger( 'show:popover', this );
					}, this ) );
				}
			};
		},

		'initialize' : function ( options ) {
			this.user = options.user;
			this.groupAvatar = options.groupAvatar;
			this.listenTo( App.vent, 'show:popover', this.closePopovers );
			$( '.see-all-members-group' ).removeClass( 'hidden' );
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

			// Change new lines to spaces since the backend can't handle newline characters
			var msg = this.ui.commentCreate.val().replace( /\n/g, ' ' );
			msg = String( stripHtml( msg ) );

			if ( msg === '' || !msg.replace( / /g,'' ).length ) {
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
					App.errorHandler( new Error( 'An error occurred while saving your comment. Please try again later.' ) );
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
