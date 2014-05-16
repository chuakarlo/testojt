define( function ( require ) {
	'use strict';

	var getConfig = require( './getConfig' );

	return function ( fileName ) {

		fileName = fileName || getConfig( 'profileAvatarDefaultFileName' );

		return getConfig( 'profileAvatarWebPath' ) + fileName;

	};

} );
