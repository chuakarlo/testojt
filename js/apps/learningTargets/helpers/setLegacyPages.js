define( function ( require ) {
	'use strict';

	var legacyPages = {
		'processes'    : {
			'page'    : 'observation',
			'subPage' : 'observationProcessesOfMe'
		},
		'courses'      : {
			'page'    : 'courses',
			'subPage' : 'coursesBrowse'
		},
		'catalogs'     : {
			'page'    : 'home',
			'subPage' : 'homeCatalog'
		},
		'portfolio'    : {
			'page'    : 'home',
			'subPage' : 'homePortfolio'
		},
		'observations' : {
			'page'    : 'observation',
			'subPage' : 'observationOfMe'
		}
	};

	return function ( page ) {
		return legacyPages[ page ];
	};

} );
