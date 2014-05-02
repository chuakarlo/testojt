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
		}

	} );

} );
