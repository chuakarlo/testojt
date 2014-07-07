define( function ( require ) {
	'use strict';

	require( 'common/views' );
	require( 'footer/Footer' );
	require( 'header/Header' );
	require( 'pd360/PD360' );
	require( 'flashToJs/Pd360Link' );
	require( 'flashToJs/Pd360Modal' );
	require( 'flashToJs/updateNotifications' );

	// User requires all deferred app/applications
	require( 'user/User' );

} );
