define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );

	var optSetters = {
		'processes' : function ( options ) {
			var opts = {
				processId     : options.pageid,
				processTaskId : options.subpageid
			};
			return opts;
		},

		'observations' : function ( options ) {
			var opts = {
				showPerFocus : options.pageid
			};

			return opts;
		},

		'default' : function ( options ) {
			return parseInt( options.pageid, 10 );
		}
	};

	return function ( content, reqOpts ) {
		var defaults = [ 'courses', 'portfolio', 'catalogs' ];

		if ( _.contains( defaults, content ) ) {
			content = 'default';
		}

		return optSetters[ content ]( reqOpts );
	};

} );
