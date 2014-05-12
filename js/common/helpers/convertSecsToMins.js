define( function ( require ) {
	'use strict';

	return function ( secs ) {
		var hr  = Math.floor( secs / 3600 );
		var min = Math.floor( ( secs - hr * 3600 ) / 60 );
		var s   = Math.floor( secs - ( hr * 3600 + min * 60 ) );

		var minutes = min;
		var seconds = s > 9 ? s : '0' + s;

		return minutes + ' : ' + seconds;
	};

} );
