define( function ( require ) {
	'use strict';

	var Marionette        = require( 'marionette' );
	var GroupCommentsView = require( '../views/GroupCommentsView' );

	return Marionette.CollectionView.extend( {

		'itemView' : GroupCommentsView,

		// Replying to a comment needs the user avatar
		'itemViewOptions' : function ( options ) {
			return {
				user : this.user
			};
		},

		'initialize' : function ( options ) {
			this.user = options.user;
		},

		'appendHtml' : function ( collectionView, itemView, index ) {
			// This is kind of hacky but it lets us insert new comments at the
			// top of the collection view.
			if ( this.collection.first() === itemView.model ) {
				collectionView.$el.prepend( itemView.el );
			} else {
				collectionView.$el.append( itemView.el );
			}
		}

	} );

} );
