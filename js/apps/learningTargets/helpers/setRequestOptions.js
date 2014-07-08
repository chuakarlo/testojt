define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var optSetters = {
		'processes' : function ( options ) {
			return {
				processId     : options.pageid,
				processTaskId : options.subpageid
			};
		},

		'observations' : function ( options ) {
			return {
				showPerFocus : options.pageid
			};
		},

		'default' : function ( options ) {
			return parseInt( options.pageid, 10 );
		}
	};

	return function ( content, reqOpts ) {
		var defaults = [ 'courses', 'portfolio', 'catalogs' ];

		if ( _.isNull( reqOpts.pageid ) && _.isNull( reqOpts.subpageid ) ) {
			return null;
		}

		if ( _.contains( defaults, content ) ) {
			content = 'default';
		}

		return optSetters[ content ]( reqOpts );
	};

} );
