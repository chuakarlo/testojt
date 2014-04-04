define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		initialize: function( ) {

			var CommentCollection = require( '../collections/CommentCollection' );

	        var replies = this.get('replies');
	        if ( replies ){
	            this.replies = new CommentCollection( replies );
	            this.unset('replies');
	        }

	    }

	} );

} );