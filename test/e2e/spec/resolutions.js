'use strict';

var map = {
	// iPhone 4
	'phone' : {
		'x' : 480,
		'y' : 800
	},

	// Nexus 7
	'tablet' : {
		'x' : 800,
		'y' : 1280
	},

	// 19" Monitor
	'desktop' : {
		'x' : 1024,
		'y' : 1280
	},

};

var resolutions = {};

Object.keys( map ).forEach( function ( key ) {
	var value = map[ key ];

	resolutions[ key ] = {
		'portrait' : {
			'width'  : value.x,
			'height' : value.y
		},
		'landscape' : {
			'height' : value.x,
			'width'  : value.y
		}
	};
} );

module.exports = resolutions;
