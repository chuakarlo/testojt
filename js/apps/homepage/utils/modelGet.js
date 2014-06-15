define( function () {
	'use strict';

	function checkKey ( value, def ) {
		return value ? value : def;
	}

	return {
		'modelGet' : function ( model, key, def ) {
			def = def || '';
			return model ? checkKey( model.get( key ), def ) : def;
		}
	};
} );
