define( function () {
	'use strict';

	var defaultOptions = {
		'circleSize'      : 25,
		'thickness'       : 4,
		'showPercentText' : false
	};

	return function (  target, cssSelector, completion, options ) {
		options = options || defaultOptions;
		require( [ 'pc-progressCircle' ], function ( $ ) {
			$( target ).find( cssSelector ).progressCircle( {
				'nPercent'        : completion,
				'circleSize'      : options.circleSize,
				'thickness'       : options.thickness,
				'showPercentText' : options.showPercentText
			} );
		} );
	};
} );
