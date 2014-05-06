define( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var CommentModel = require( '../models/CommentModel' );

	return Backbone.Collection.extend( {

		'model'   : CommentModel,

		'comparator' : function ( model ) {

			// collection will be sorted by 'Created' date in descending order ( newest first )
			return -new Date( model.get( 'Created' ) );

		}

	} );

} );
