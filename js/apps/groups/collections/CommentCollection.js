define( function ( require ) {
	'use strict';

	var Backbone     = require( 'backbone' );
	var CommentModel = require( '../models/CommentModel' );

	return Backbone.Collection.extend( {

		'model'   : CommentModel,

		'comparator' : function ( model ) {
			// return this.sortKey.getTime();
			// return model.get( this.sortKey );
			return -new Date(model.get('Created'));

		}

	} );

} );