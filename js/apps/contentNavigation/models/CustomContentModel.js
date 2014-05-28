define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend ( {
		'idAttribute' : 'ContentId',
		'initialize'  : function () {
			this.set( 'VideoTypeId', 1 );
		}
	} );

} );
