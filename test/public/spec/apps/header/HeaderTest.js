define( function ( require ) {
	'use strict';

	var headerModule = require( 'apps/header/Header' );
	var Vent         = require( 'Vent' );
	var sinon        = window.sinon;

	describe( 'Header Module', function () {
		var App;
		var Header;

		beforeEach( function () {
			App = {
				'module' : function () {}
			};

			Header = {
				'Show' : {
					'Controller' : {
						'showHeader' : function () {}
					}
				},
				'on' : function () {}
			};
		} );

		it( 'should create module `Header.Show`', function () {
			var spy = sinon.spy( App, 'module' );

			headerModule( Header, App );

			spy.should.have.been.calledWith( 'Header.Show' );
		} );

		it( 'should call `showHeader` on start', function () {
			var stub = sinon.stub( Header, 'on' ).callsArg( 1 );
			var spy  = sinon.spy( Header.Show.Controller, 'showHeader' );

			headerModule( Header, App );

			stub.should.have.been.calledWith( 'start' );
			stub.should.have.been.calledBefore( spy );
			spy.should.have.callCount( 1 );
		} );

		it( 'should call showHeader on Vent `session:change`', function () {
			var spy = sinon.spy( Header.Show.Controller, 'showHeader' );

			headerModule( Header, App );

			Vent.trigger( 'session:change' );

			spy.should.have.callCount( 1 );
		} );

	} );
	
} );
