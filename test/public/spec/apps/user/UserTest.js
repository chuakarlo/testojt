define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );

	require( 'user/User' );

	describe( 'User Module', function () {

		after( function () {
			App.module( 'User' ).stop();
		} );
		
		it( 'should create module `User`', function () {
			App.should.have.property( 'User' );
			App.User.should.be.an.instanceof( Marionette.Module );
		} );

	} );
	
} );
