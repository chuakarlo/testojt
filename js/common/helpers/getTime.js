/*
	Simple function to extract time in a dateTime format.
	This can be modified in the future to add time meridians.
*/
define( function ( require ) {
	'use strict';

	var setTimeValue = function ( timevalue ) {
		if ( timevalue > 10 ) {
			return timevalue;
		}
		return '0' + timevalue;
	};

	var setTimeMeridians = function ( hr ) {
		if ( hr >= 12 ) {
			return 'PM';
		}
		return 'AM';
	};

	return function ( dateTime, options ) {

		var hour = setTimeValue( new Date( dateTime ).getHours() );
		var min  = setTimeValue( new Date( dateTime ).getMinutes() );
		var sec  = setTimeValue( new Date( dateTime ).getSeconds() );
		var tm   = '';

		if ( options ) {
			tm = ' ' + setTimeMeridians( new Date( dateTime ).getHours() );
		}

		return hour + ':' + min + ':' + sec + tm;
	};

} );
