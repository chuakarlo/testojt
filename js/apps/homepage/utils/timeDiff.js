define( function () {
	'use strict';

	var moment = require( 'moment' );

	return {
		'timeDiff' : function ( model, key ) {
			var time = new Date( model.get( key ) ).getTime();
			return moment( time ).fromNow();
		}
	};
} );
