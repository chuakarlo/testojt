define( function ( require ) {
	'use strict';

	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'idAttribute' : 'ContentId',

		'initialize' : function () {
			this.set( 'VideoTypeId', 1 );
		},

		'setQueue' : function ( queueContentsIds ) {
			this.set( 'queued', _.contains( queueContentsIds, this.id ) );
		}

	} );

} );
