define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	return function () {

		var ErrorHelper = {
			'urlError' : function () {
				throw new Error('A "url" property or function must be specified');
			},

			'pathError' : function () {
				throw new Error( 'A "path" property or function must be specified' );
			},

			'syncOptionsError' : function () {
				throw new Error( 'A "getSyncOptions" function must return a value' );
			},

			'argsError' : function () {
				throw new Error( 'A "args" property must be specified' );
			},

			'methodError' : function () {
				throw new Error( 'A "method" property must be specified' );
			},

			'hasSyncOptionsErrors' : function ( syncTypes, syncOptions ) {
				var self       = this;
				var errorTypes = {
					'method' : function () {
						self.methodError();
					},

					'args' : function () {
						self.argsError();
					}
				};

				_.each( syncTypes, function ( type ) {

					if ( !_.has( syncOptions, type ) ) {
						return errorTypes[ type ]();
					}

				} );
			}

		};

		return ErrorHelper;
	};

} );
