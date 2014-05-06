define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var sinon      = window.sinon;
	var App        = require( 'App' );

	require( 'communities/Communities' );

	describe( 'Communities Module', function () {

		var navigateSpy, loadedSpy;

		before( function () {
			navigateSpy = sinon.spy();
			loadedSpy   = sinon.stub().returns( true );
			App.reqres.setHandler( 'pd360:navigate', navigateSpy );
			App.reqres.setHandler( 'pd360:loaded', loadedSpy );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:navigate' );
			App.reqres.removeHandler( 'pd360:loaded' );
			App.module( 'Communities' ).stop();
			navigateSpy = null;
			loadedSpy   = null;
		} );

		it( 'should create module Communities', function () {

			App.should.have.property( 'Communities' );
			App.Communities.should.be.an.instanceof( Marionette.Module );
			App.Communities.should.have.property( 'Router' );

		} );

		describe( 'Show Submodule', function () {

			it( 'should create the showController', function () {

				App.Communities.should.have.property( 'showController' );
				App.Communities.showController.should.have.property( 'showCommunities' );

			} );

			it( '`showCommunities` should call PD360.navigate', function () {
				App.Communities.showController.showCommunities();

				loadedSpy.should.have.callCount( 1 );
				loadedSpy.should.have.been.calledBefore( navigateSpy );

				navigateSpy.should.have.callCount( 1 );
				navigateSpy.should.have.been.calledWithExactly( 'communities', 'communitiesBrowse', {} );
			} );

		} );

	} );

} );
