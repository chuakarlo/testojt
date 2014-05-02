define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'defaults' : {
			'Message'         : '',
			'MessageThreadId' : '',
			'MessageId'       : 0,
			'CreatorAvatar'   : 'default.png',
			'Avatar'          : 'default.png',
			'Created'         : '',
			'CreatorFullName' : ''
		},

		'initialize' : function () {

			var CommentCollection = require( '../collections/CommentCollection' );

			// first wall post
			if ( this.attributes.Message === '' ) {
				this.attributes.Message         = this.attributes.NewsEntry;
				this.attributes.Created         = this.attributes.Created;
				this.attributes.MessageThreadId = this.attributes.NewsId;
			}

			var replies = this.get( 'replies' );
			if ( replies ) {
				this.replies = new CommentCollection( replies );
				this.unset('replies');
			}

		}

	} );

} );
