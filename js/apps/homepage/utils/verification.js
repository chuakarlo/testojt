define( function () {
	'use strict';

	function validate ( obj, chai ) {

		var data   = obj.data;
		var schema = obj.schema;
		var error  = {
			'message' : 'Empty data'
		};

		if ( !Array.isArray( data ) || data.length < 0 ) {
			return error;
		}

		if ( typeof schema !== 'object' ) {
			schema = JSON.parse( schema );
		}

		for ( var i = 0; i < ( obj.limit || data.length ); i++ ) {
			try {
				chai.expect( data[ i ] ).to.be.jsonSchema( schema );
			} catch ( err ) {
				return err;
			}
		}
	}

	return {
		/**
		 * OLD
		 * Use for API data validation
		 * @param  {JSON}     schema    Json Schema
		 * @param  {Array}    data      Array of data retrieved from API
		 * @param  {Function} callback  having an error argument
		 * @param  {Number}    limit     optional (limit for looping)
		 */
		/*
		 * NEW
		 * @param  {Function} callback  having an error argument
		 * @param  {Array}    arObjuect array of objects consist of { schema, data, limit }
		 *                              or single object
		 */
		'jsonVal' : function ( callback, arObject, done, limitTemp ) {
			require( [ 'chai-json-schema' ], function ( jsonSchema ) {

				var chai = require( 'chai' );
				chai.use( jsonSchema );

				if ( typeof callback === 'function' ) {
					if ( !Array.isArray( arObject ) ) {
						arObject = [ arObject ];
					}

					arObject.forEach( function ( obj ) {
						var err = validate( obj, chai );
						if ( err ) {
							callback( err );
							return;
						}
					} );

					//if not early return invoke callback with no arguments
					callback( );
				} else {
					// This is only temporary, this will be removed after
					// code refactor
					// Previous parameters are :
					//  ( schema, data, callback, limit )

					var toBeValidated = {
						'schema' : callback,
						'data'   : arObject,
						'limit'  : limitTemp
					};
					done( validate( toBeValidated, chai ) );
				}

			} );
		}
	};
} );
