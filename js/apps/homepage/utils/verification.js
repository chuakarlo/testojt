define(function () {
	'use strict';

	return {
		/**
		 * Use for API data validation
		 * @param  {JSON}     schema    Json Schema
		 * @param  {Array}    data      Array of data retrieved from API
		 * @param  {Function} callback  having an error argument
		 * @param  {Number}    limit     optional (limit for looping)
		 */
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
					return;
				}
				callback( 'invalid data' );
			} );
		}
	};
} );
