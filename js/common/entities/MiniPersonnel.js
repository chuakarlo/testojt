define( function( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.CFModel.extend( {

		'defaults' : {
			'FirstName' : '',
			'LastName' : ''
		},

		'path' : 'RespondService',

		'getReadOptions' : function() {
			return {
				'method' : 'RespondMiniProfileAPI',
				'args'   : this.toJSON()
			};
		}
	} );

} );