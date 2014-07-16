define( function ( require ) {
	'use strict';

	var getConfig = require( './getConfig' );

	return function ( fileName ) {

		// ugly hack because database added this path to all users
		fileName = fileName.replace( 'PD360/uploads/avatars/profile/', '' );

		fileName = fileName || getConfig( 'profileAvatarDefaultFileName' );

		return getConfig( 'profileAvatarWebPath' ) + fileName;

	};

} );
