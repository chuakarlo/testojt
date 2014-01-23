define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var _        = require( 'underscore' );
	var Backbone = require( 'backbone' );
	var Cookie   = require( 'jquery-cookie' );
	var Vent     = require( 'Vent' );

	var Session = Backbone.Model.extend( {

	} );

	return new Session();
} );