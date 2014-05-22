define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );

	require( 'apps/messages/Messages' );

	describe( 'Messages Module', function () {

		it( 'should create a `Messages` submodule', function () {
			App.should.have.property( 'Messages' );
			App.Messages.should.be.an.instanceof( Marionette.Module );
		} );

	} );

	describe( 'Messages Module Main Controller', function () {

		it( 'should create a `Main` submodule with `Controller` property', function () {
			App.Messages.should.have.property( 'Main' );
			App.Messages.Main.should.have.property( 'controller' );
			App.Messages.Main.should.be.an.instanceof( Marionette.Module );
		} );

	} );

} );
