define( function ( require ) {
	'use strict';

	var moment = require( 'moment-timezone' );

	// Timezone support for moment
	// Used in Reflection and Followup question switching.
	moment.tz.add( {
		'zones' : {
			'MST7MDT' : [
				'-7 US M%sT'
			]
		},
		'rules' : {
			'US' : [
				'1918 1919 2 0 8 2 0 1 D',
				'1918 1919 9 0 8 2 0 0 S',
				'1942 1942 1 9 7 2 0 1 W',
				'1945 1945 7 14 7 23 1 1 P',
				'1945 1945 8 30 7 2 0 0 S',
				'1967 2006 9 0 8 2 0 0 S',
				'1967 1973 3 0 8 2 0 1 D',
				'1974 1974 0 6 7 2 0 1 D',
				'1975 1975 1 23 7 2 0 1 D',
				'1976 1986 3 0 8 2 0 1 D',
				'1987 2006 3 1 0 2 0 1 D',
				'2007 9999 2 8 0 2 0 1 D',
				'2007 9999 10 1 0 2 0 0 S'
			]
		},
		'links' : {}
	} );
} );
