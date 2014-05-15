 define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/user/templates/login/errorHolderView.html' );

	return Marionette.ItemView.extend( {

		'template'	: _.template( template )

	} );

} );
