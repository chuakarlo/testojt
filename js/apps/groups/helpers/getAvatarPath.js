define( function ( require ) {
	'use strict';

	return function ( fileName ) {

		fileName = fileName || 'default.png';

		return 'http://resources.pd360.com/PD360/uploads/avatars/group/' + fileName;

	};

} );
