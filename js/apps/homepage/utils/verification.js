define(function () {
	'use strict';

	return {
		'jsonVal' : function (schema, data, callback, limit ) {
			require( [ 'chai-json-schema' ], function ( jsonSchema ) {
				var chai = require('chai');
				chai.use( jsonSchema );

				if ( Array.isArray( data ) ) {

					for (var i = 0; i < ( limit || data.length ); i++) {
						try {
							chai.expect( data[i] ).to.be.jsonSchema(schema);
						} catch ( err ) {
							callback( err );
							break;
						}
					}
					callback();
				}
			} );
		}
	};
} );
