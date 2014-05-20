define( function ( require ) {
	'use strict';

	require( 'common/views' );
	require( 'footer/Footer' );
	require( 'header/Header' );
	require( 'pd360/PD360' );
	require( 'Pd360Link' );

	// User requires all deferred app/applications
	require( 'user/User' );

} );
