define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var _        = require( 'underscore' );
	var App      = require( 'App' );

	require( 'groups/entities/WallQueryModel' );
	require( 'groups/entities/WallCommentModel' );

	App.module( 'Entities', function ( Mod ) {

		Mod.WallCommentCollection = Backbone.CFCollection.extend( {

			'model' : Mod.WallCommentModel,

			'path'   : 'groups.GroupMessagesGateway',

			'initialize' : function ( options ) {
				// This lets us know when we've reached the end
				this.maxResults = false;

				// query model keeps track of our infinite scrolling position
				if ( options.queryModel ) {
					this.wallQueryModel = options.queryModel;
				} else {
					this.wallQueryModel = new Mod.WallQueryModel();
				}
			},

			'getReadOptions' : function () {
				return {
					'method' : 'getGroupWall',
					'args'   : {
						'licId'     : this.wallQueryModel.get('licId'),
						'startRow'  : this.wallQueryModel.get( 'startRow' ),
						'numRows'   : this.wallQueryModel.get( 'numRows' ),
						'totalRows' : this.wallQueryModel.get( 'totalRows' ),
						'msgFlag'   : this.wallQueryModel.get( 'msgFlag' ),
						'newsFlag'  : this.wallQueryModel.get( 'newsFlag' )
					}
				};
			},

			'comparator' : function ( model ) {
				// collection will be sorted by 'Created' date in descending
				// order ( newest first )
				return -new Date( model.get( 'Created' ) );
			},

			'parse' : function ( res ) {

				// XXX I don't like this
				// This should happen when it's got no more results
				if ( res.length < this.wallQueryModel.get( 'numRows' ) ) {
					this.maxResults = true;
					// this.wallQueryModel.set( 'startRow', 0 );
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
			}
		} );

		// Defined so each model in the collection is set as the
		// WallCommentModel
		Mod.WallCommentChildCollection = Backbone.Collection.extend( {
			'model' : Mod.WallCommentModel
		} );

	} );

} );
