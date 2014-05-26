define( function ( require ) {
	'use strict';

	var $ = require( 'jquery' );

	// Match a query and captures query key and value.
	// example: 'taskId=2'
	// results: ['taskId=2', 'taskId', '2']
	var re = /([^&=]+)=?([^&]*)/g;

	var decode = function ( str ) {
		return decodeURIComponent( str.replace( /\+/g, ' ' ) );
	};

	// Returns query parameters as object.
	$.parseParams = function ( query ) {
		var params = { };
		var e;

		if ( query ) {
			if ( query.substr( 0, 1 ) === '?' )  {
				query = query.substr( 1 );
			}

			while ( ( e = re.exec( query ) ) ) {
				var key   = decode( e[ 1 ] );
				var value = decode( e[ 2 ] );

				if ( params[ key ] !== undefined ) {
					if ( !$.isArray( params[ key ] ) ) {
						params[ key ] = [ params[ key ] ];
					}
					params[ key ].push( value );
				} else {
					params[ key ] = value;
				}
			}
		}
		return params;
	};
} );
