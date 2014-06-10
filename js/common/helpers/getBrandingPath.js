define( function ( require ) {
	'use strict';

	var getConfig = require( './getConfig' );

	return function ( fileName, size ) {

		var availableSizes = {
			'sm'   : '_320',
			'md'   : '_960',
			'lg'   : '_1200',
			'orig' : ''
		};

		size = size || 'sm';

		var webPath = getConfig( 'groupAvatarWebPath' );

		if ( !fileName ) {
			return webPath + getConfig( 'groupBannerDefaultFileName' );
		}

		var fileExtension = fileName.split( '.' ).pop();
		var origFilename  = fileName.slice( 0, fileName.lastIndexOf( '.' ) );

		return webPath + origFilename + availableSizes[ size ] + '.' + fileExtension;

	};

} );
