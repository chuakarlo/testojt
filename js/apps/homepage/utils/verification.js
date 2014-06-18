define(function () {
	'use strict';

	var chai;

	return function (schema, data, callback) {
		require([ 'chai-json-schema' ], function () {
			var ret = true;
			try {
				chai.expect(data).to.be.jsonSchema(schema);
			} catch ( err ) {
				ret = err;
			}
			console.log( ret );
			callback( ret );
		});
	};
});
