define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var optSetters = {
		'processes' : function ( options ) {
			var opts = null;

			if ( options !== null ) {
				opts = {
					processId     : options.pageid,
					processTaskId : options.subpageid
				};
			}

			return opts;
		},

		'observations' : function ( options ) {
			var opts = null;

			if ( options.pageid !== null ) {
				opts = {
					showPerFocus : options.pageid
				};
			}

			return opts;
		},

		'default' : function ( options ) {
			var opts = null;

			if ( options !== null ) {
				opts = parseInt( options.pageid, 10 );
			}

			return opts;
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
