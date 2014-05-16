define( function ( require ) {
	'use strict';

	var getConfig = require( './getConfig' );

	return function ( fileName, size ) {

		var availableSizes = {
			'sm'   : '320_',
			'md'   : '960_',
			'lg'   : '1200_',
			'orig' : ''
		};

		size = size || 'sm';

		fileName = fileName || getConfig( 'groupBannerDefaultFileName' );

		return getConfig( 'groupAvatarWebPath' ) + availableSizes[ size ] + fileName;

	};

} );
