define( function ( require ) {
	'use strict';

	var App                 = require( 'App' );
	var $                   = require( 'jquery' );
	var _                   = require( 'underscore' );

	var Session             = require( 'Session' );

	require( 'groups/entities/WallCommentCollection' );
	require( 'groups/entities/WallCommentModel' );
	require( 'groups/entities/GroupModel' );
	require( 'common/controllers/BaseController' );

	App.module( 'Groups.Show', function ( Mod ) {

		Mod.WallController = App.Common.Controllers.BaseController.extend( {

			'initialize' : function ( options ) {

				this.model = options.model;
				this.layout = options.layout;

				this.user = App.request( 'user:personnel' );
				_.bindAll( this, 'showGroup' );
			},

			'getData' : function ( groupId ) {
				// This will hold all of our wall posts.
				this.wallCollection = new App.Entities.WallCommentCollection([ ], {
					'groupId' : groupId
				});

				App.when(
					this.wallCollection.fetch(),
					this.model.userIsGroupMember( Session.personnelId() ) )
				.done( this.showGroup )
				.fail( _.bind( function () {
					this.layout.groupContentRegion.show( new App.Common.ErrorView( {
						'message' : 'There was an error loading the wall.',
						'flash'   : 'An error occurred. Please try again later.'
					} ) );
				}, this ) );
			},

			'showGroup' : function ( collection, isMember ) {

				this.wallCollection.updateStartRow();

				var commentsView = new App.Groups.Views.CommentsCollection( {
					'model'      : this.model,
					'collection' : this.wallCollection,
					'user'       : this.user
				} );

				// We listen to the close event so we can disable the bum smack
				this.listenTo( commentsView, 'close', this.close );

				this.layout.groupsContentRegion.show( commentsView );

				this.setupInfiniteScroll();

				// Check if this user is a member to show additional sections
				if ( isMember ) {

					commentsView.showCreateSection();

				}
			},

			'setupInfiniteScroll' : function () {
				// When the window scroll bar gets to 200px from the bottom
				// of the window, fetch the next set of results.

				// check to see if we should continue setting up the smack
				if ( !this.wallCollection.maxResults ) {

				// if ( totalRows > start && totalRows > rows || !totalRows && !start ) {
					$( window ).smack( {
						'threshold' : '200px'
					} )
						.done( _.bind(function () {
							// Show Loading
							this.showLoading();
							// Reset starting point
							this.wallCollection.fetch( {
								'reset'   : false,
								'remove'  : false,
								'success' : _.bind( function () {
									this.wallCollection.updateStartRow();
									this.setupInfiniteScroll();
									this.closeLoading();
								}, this ),
								'error'   : _.bind( function () {
									var msg = 'An error occurred loading more ' +
									'comments. Please try again later.';
									App.vent.trigger( 'flash:message', {
										'message' : msg
									} );
									this.closeLoading();
								}, this )
							});
						}, this) );
				}

			},

			'showLoading' : function () {
				var loading = new App.Common.LoadingView( {
					'size'       : 'small',
					'background' : true,
					'text'       : 'Loading Posts'
				} );
				this.layout.loadingRegion.show(loading);
			},

			'closeLoading' : function () {
				this.layout.loadingRegion.close();
			},

			'onClose' : function () {
				// Make sure to stop the bum-smack
				$( window ).off( 'scroll.smack' );
			}

		} );

	} );

} );
