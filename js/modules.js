define( function ( require ) {
	'use strict';

	require( 'common/Common' );
	require( 'footer/Footer' );
	require( 'header/Header' );
	require( 'pd360/PD360' );
	require( 'flashToJs/Pd360Link' );
	require( 'flashToJs/Pd360Modal' );
	require( 'flashToJs/updateNotifications' );
	require( 'flashToJs/groupUpdateFromFlash' );

	// User requires all deferred app/applications
	require( 'user/User' );

} );
