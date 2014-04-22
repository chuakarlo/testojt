'use strict';

// Config and options
var thresholds = require( './config' );

function lessThanOrEqualTo ( a, b ) {
	return a <= b;
}

function greaterThanOrEqualTo ( a, b ) {
	return a >= b;
}

function greaterThan ( a, b ) {
	return a > b;
}

function json ( level, threshold, a, report ) {
	return {
		'level'       : level,
		'message'     : threshold.message,
		'file'        : report.path,
		'actual'      : a,
		'threshold'   : threshold[ level ],
		'description' : threshold.description,
		'report'      : report
	};
}

function check ( metric, a, report ) {
	var map = {
		'<=' : lessThanOrEqualTo,
		'>=' : greaterThanOrEqualTo,
		'>'  : greaterThan
	};

	var threshold = thresholds[ metric ];
	var warn      = map[ threshold.operator ]( a, threshold.warn );
	var error     = map[ threshold.operator ]( a, threshold.error );

	if ( error ) {
		return json( 'error', threshold, a, report );
	}

	if ( warn ) {
		return json( 'warn', threshold, a, report );
	}

}

module.exports = check;