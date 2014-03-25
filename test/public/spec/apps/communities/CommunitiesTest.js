define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'communities/Communities' );

	describe( 'Communities Module', function () {

		after( function () {
			App.module( 'Communities' ).stop();
		} );

		it( 'should create module Communities', function () {

			App.should.have.property( 'Communities' );
			App.Communities.should.be.an.instanceof( Marionette.Module );
			App.Communities.should.have.property( 'Router' );

		} );

		describe( 'Show Submodule', function () {
			
			before( function () {
				App.PD360 = {};
			} );

			after( function () {
				App.PD360 = null;
			} );

			it( 'should create submodule `Show`', function () {

				App.Communities.should.have.property( 'Show' );
				App.Communities.Show.should.have.property( 'Controller' );
				App.Communities.Show.Controller.should.have.property( 'showCommunities' );

			} );

			it( '`showCommunities` should call PD360.navigate', function () {
				var spy = sinon.spy();
				App.PD360.navigate = spy;

				App.Communities.Show.Controller.showCommunities();

				spy.should.have.callCount( 1 );
				spy.should.have.been.calledWithExactly( null, 'communities', 'communitiesBrowse' );
			} );

		} );

	} );

} );
