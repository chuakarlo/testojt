define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var Vent       = require( 'Vent' );
	var App        = require( 'App' );

	require( 'apps/header/Header' );

	describe( 'Header Module', function () {

		after( function () {
			App.module( 'Header' ).stop();
		} );

		it( 'should create module `Header`', function () {
			App.should.have.property( 'Header' );
			App.Header.should.be.an.instanceof( Marionette.Module );
		} );

		describe( 'Show Submodule', function () {
			
			it( 'should create `Show` submodule', function () {
				App.Header.should.have.property( 'Show' );
				App.Header.Show.should.have.property( 'Controller' );
				App.Header.Show.Controller.should.have.property( 'showHeader' );
			} );

			it( 'should call controllers `showHeader` on start', function () {
				var stub = sinon.stub( App.Header.Show.Controller, 'showHeader' );

				App.Header.trigger( 'start' );

				stub.should.have.callCount( 1 );
				App.Header.Show.Controller.showHeader.restore();
			} );

			it( 'should call controllers `showHeader` from Vent `session:destroy`', function () {
				var stub = sinon.stub( App.Header.Show.Controller, 'showHeader' );

				Vent.trigger( 'session:destroy' );

				stub.should.have.callCount( 1 );
				App.Header.Show.Controller.showHeader.restore();
			} );

			it( 'should call controllers `showHeader` from Vent `session:change`', function () {
				var stub = sinon.stub( App.Header.Show.Controller, 'showHeader' );

				Vent.trigger( 'session:change' );

				stub.should.have.callCount( 1 );
				App.Header.Show.Controller.showHeader.restore();
			} );

		} );


	} );

} );
