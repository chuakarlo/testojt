define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'communities/Communities' );

	describe( 'Communities Module', function () {

		var spy;

		before( function () {
			spy = sinon.spy();
			App.reqres.setHandler( 'pd360:navigate', spy );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:navigate' );
			App.module( 'Communities' ).stop();
		} );

		it( 'should create module Communities', function () {

			App.should.have.property( 'Communities' );
			App.Communities.should.be.an.instanceof( Marionette.Module );
			App.Communities.should.have.property( 'Router' );

		} );

		describe( 'Show Submodule', function () {

			it( 'should create submodule `Show`', function () {

				App.Communities.should.have.property( 'Show' );
				App.Communities.Show.should.have.property( 'Controller' );
				App.Communities.Show.Controller.should.have.property( 'showCommunities' );

			} );

			it( '`showCommunities` should call PD360.navigate', function () {
				App.Communities.Show.Controller.showCommunities();

				spy.should.have.callCount( 1 );
				spy.should.have.been.calledWithExactly( null, 'communities', 'communitiesBrowse' );
			} );

		} );

	} );

} );
