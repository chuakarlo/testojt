define( function ( require ) {
	'use strict';

	var App   = require ( 'App' );
	var sinon = window.sinon;

	require( 'apps/messages/entities/Notifications' );
	require( 'apps/messages/controllers/mainController' );

	describe( 'Module Messages.Main', function () {
		var stub;
		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'Messages.Main' ).stop();
		} );

		it( 'should invoke showMessages', function () {
			( typeof App.Messages ).should.not.equal( 'undefined' );
			( typeof App.Entities ).should.not.equal( 'undefined' );
			App.Messages.Main.controller.showMessages();
			stub.callCount.should.greaterThan( 0 );
		} );
	} );

} );
