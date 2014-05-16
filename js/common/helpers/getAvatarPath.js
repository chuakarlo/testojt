define( function ( require ) {
	'use strict';

	var getConfig = require( './getConfig' );

	return function ( fileName ) {

		fileName = fileName || getConfig( 'groupAvatarDefaultFileName' );

		return getConfig( 'groupAvatarWebPath' ) + fileName;

	};

} );
