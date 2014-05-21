define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );

	require( 'groups/entities/WallQueryModel' );
	require( 'groups/entities/WallCommentModel' );

	App.module( 'Entities', function ( Mod ) {

		var groupIdError = function () {
			throw new Error( 'The groupId option is required' );
		};

		Mod.WallCommentCollection = Backbone.CFCollection.extend( {

			'model' : Mod.WallCommentModel,

			'path'   : 'groups.GroupMessagesGateway',

			'initialize' : function ( models, options ) {
				options = options || { };

				if ( !options.groupId ) {
					groupIdError();
				}

				this.wallQueryModel = new Mod.WallQueryModel( {
					'licId' : options.groupId
				} );

				// This lets us know when we've reached the end
				this.maxResults = false;

			},

			'getReadOptions' : function () {
				return {
					'method' : 'getGroupWall',
					'args'   : this.wallQueryModel.toJSON()
				};
			},

			'comparator' : function ( model ) {
				// collection will be sorted by 'Created' date in descending
				// order ( newest first )
				return -new Date( model.get( 'Created' ) );
			},

			'parse' : function ( res ) {
				// This should happen when it's got no more results
				if ( res.length < this.wallQueryModel.get( 'numRows' ) ) {
					this.maxResults = true;
				} else if ( this.models.length >= this.wallQueryModel.get( 'totalRows' ) ) {
					this.maxResults = true;
				}

				var toRemove = [ ];

				_.each(res, function ( model, index ) {

					// If it's not a news entry, set a fake ID so we know which
					// Collection to update when we receive only one parent
					// comment and it's children
					if ( !model.NewsEntry ) {
						model.id = model.MessageId.toString() + model.MessageThreadId.toString();
					}

					// Find all the children posts and assign them to their
					// parent post.
					if ( model && model.MessageId && model.MessageId !== 1 ) {

						var parentIndex;

						// iterate backwards trying to find the parent
						while ( index >= 1 ) {
							parentIndex = index - 1;
							if ( res[ parentIndex ].MessageId === 1) {
								break;
							}
							index--;
						}

						var parent = res[ parentIndex ];

						// add the model to the replies attribute on the parent
						var replies = parent.replies || [ ];
						replies.push( model );

						parent.replies = replies;

						toRemove.push( model );
					}

				} );

				// Remove the models that were moved to the reply attributes
				_.each( toRemove, function ( r ) {
					var i = res.indexOf( r );
					if ( i !== -1 ) {
						res.splice(i, 1);
					}
				} );

				return res;
			},

			'getComputedPosition' : function ( model ) {
				// This function figures out the position of the startRow
				// attribute of a specifc model. assigns the computedPosition
				// variable on the collection
				this.computedPosition = -1;
				this.find( _.bind( function ( m ) {
					this.computedPosition++;

					// if we are on the model, return so we don't increment the
					// counter
					if ( m === model ) {
						return m;
					}

					var replies = m.get( 'replies' );

					if ( _.isArray( replies ) ) {
						_.each( replies, _.bind( function ( reply ) {
							this.computedPosition++;
						}, this ) );
					}
				}, this) );
			},

			'updateStartRow' : function () {
				// Because the server can return 30 replies even though you
				// asked for 15, we need to compute where the start should be.
				var startRow = 0;
				this.each( function ( model ) {
					startRow++;

					var replies = model.get( 'replies' );

					if ( _.isArray( replies ) ) {
						_.each( replies, function ( reply ) {
							startRow++;
						} );
					}
				} );

				this.wallQueryModel.set( 'startRow', startRow );
			},

			'newCommentFetch' : function ( options ) {
				// This is a fun function that handles when a new comment was
				// added. Allows you to specify a specific location to query
				// against the server to get just a specific comment ( parent
				// comments only ). Also allows a success and error cb function
				// to be passed and called.
				options = options || { };

				// The last starting point for the query
				var oldStart = this.wallQueryModel.get( 'startRow' );
				var oldNum = this.wallQueryModel.get( 'numRows' );

				this.wallQueryModel.set( {
					'startRow' : options.startRow,
					'numRows'  : options.numRows
				} );

				this.fetch( {
					'reset'   : false,
					'remove'  : false,
					'success' : _.bind( function () {
						// Once we've fetched just that post and it's
						// children, set the queryModel back to what it was
						this.wallQueryModel.set( {
							'startRow' : oldStart,
							'numRows'  : oldNum
						} );

						if ( options.successCb ) {
							options.successCb();
						}

					}, this ),

					'error' : function () {
						if ( options.errorCb ) {
							options.errorCb();
						}
					}
				} );
			}

		} );

		// Defined so each model in the collection is set as the
		// WallCommentModel
		Mod.WallCommentChildCollection = Backbone.Collection.extend( {
			'model' : Mod.WallCommentModel
		} );

	} );

} );
