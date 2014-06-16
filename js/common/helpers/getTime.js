/*
	Simple function to extract time in a dateTime format.
	This can be modified in the future to add time meridians.
*/
define( function ( require ) {
	'use strict';

	// function to format the display value
	// concat zero if less than 10 e.g '09'
	var setTimeValue = function ( timevalue ) {
		if ( timevalue >= 10 ) {
			return timevalue;
		}
		return '0' + timevalue;
	};

	// function to set Time Meridians if the user choose to display 12hr format
	var setTimeMeridians = function ( hr ) {
		var hourtm = {
			'hr' : hr,
			'tm' : 'AM'
		};

		if ( hr >= 12 ) {
			hourtm.hr = setTimeValue( hr - 12 );
			hourtm.tm = 'PM';
		}

		return hourtm;
	};

	return function ( dateTime, options ) {
		var hour = setTimeValue( new Date( dateTime ).getHours() );
		var min  = setTimeValue( new Date( dateTime ).getMinutes() );
		var sec  = setTimeValue( new Date( dateTime ).getSeconds() );
		var tm   = '';

		if ( options ) {
			var hourtm = setTimeMeridians( new Date( dateTime ).getHours() );
			hour = hourtm.hr;
			tm   = ' ' + hourtm.tm;
		}

		return hour + ':' + min + ':' + sec + tm;
	};

} );
