/*
	Simple function to extract time in a dateTime format.
	This can be modified in the future to add time meridians.
*/
define( function ( require ) {
	'use strict';

	return function ( dateTime ) {
		var hour = new Date( dateTime ).getHours();
		var min  = new Date( dateTime ).getMinutes();
		var sec  = new Date( dateTime ).getSeconds();

		if ( hour < 10 ) {
			hour = '0' + hour;
		}
		if ( min < 10 ) {
			min = '0' + min;
		}
		if ( sec < 10 ) {
			sec = '0' + sec;
		}

		return hour + ':' + min + ':' + sec;
	};

} );
