define ( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	describe( 'Program - ProgramTest', function () {

		before( function () {
			var stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
			App.module( 'Program' ).stop();
		} );

		it( 'should create Program module', function () {
			App.should.have.property( 'Program' );
			App.Program.should.be.an.instanceof( Marionette.Module );

		} );
	} );
} );
