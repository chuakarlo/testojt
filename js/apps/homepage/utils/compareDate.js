define( function () {
	'use strict';

	var modeMap = {
		'asc'  : 1,
		'desc' : -1
	};

	return function ( model, key, mode ) {
		var modeOp = mode ? modeMap[ mode ] : modeMap.desc;
		return modeOp * ( new Date( model.get( key ) ).getTime() );
	};
} );
