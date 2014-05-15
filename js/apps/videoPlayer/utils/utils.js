define( function ( require, exports, module ) {
	'use strict';

	module.exports = {

		'formatTime' : function ( time ) {
			var hours   = Math.floor( time / 3600 );
			var minutes = Math.floor( ( time - ( hours * 3600 ) ) / 60 );
			var seconds = time - ( hours * 3600 ) - ( minutes * 60 );
			var formattedTime;

			if ( hours < 10 ) {
				hours = '0' + hours;
			}
			if ( minutes < 10 ) {
				minutes = '0' + minutes;
			}
			if ( seconds < 10 ) {
				seconds = '0' + seconds;
			}

			formattedTime = hours + ':' + minutes + ':' + seconds;

			return formattedTime;
		}

	};

} );
