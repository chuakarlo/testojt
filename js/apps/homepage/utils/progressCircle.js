define( function () {
	'use strict';

	var defaultOptions = {
		'circleSize'      : 32,
		'thickness'       : 3,
		'showPercentText' : true
	};

	function setCircle ( $, target, cssSelector, completion, options ) {
		$( target ).find( cssSelector ).progressCircle( {
			'nPercent'        : completion,
			'circleSize'      : options.circleSize,
			'thickness'       : options.thickness,
			'showPercentText' : options.showPercentText
		} );
	}

	function showProgCircle (  target, cssSelector, completion, options, callback ) {
		require( [ 'pc-progressCircle' ], function ( $ ) {
			setCircle( $, target, cssSelector, completion, options || defaultOptions );
			if ( callback ) {
				callback( $ );
			}
		} );
	}

	return {
		'progressCircle' : showProgCircle
	};
} );
