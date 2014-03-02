define( function ( require ) {
	'use strict';

	var showModule  = require( 'apps/communities/controllers/showController' );
	var sinon       = window.sinon;

	describe( 'Communities Show Module', function () {

		var Show;
		var App;

		var spy;

		beforeEach( function () {
			Show = {};
			App = {
				'PD360' : {
					'navigate' : function () {},
					'show'     : function () {}
				}
			};
		} );

		afterEach( function () {
			Show = null;
			App  = null;

			spy = null;
		} );

		it( 'should set `Controller` on Show', function () {
			showModule( Show, App );
			Show.should.have.property( 'Controller' );
		} );

		it( '`showCommunities` method should call `navigate` of PD360 module', function () {
			spy = sinon.spy( App.PD360, 'navigate' );

			showModule( Show, App );

			Show.should.have.property( 'Controller' );
			Show.Controller.should.have.property( 'showCommunities' );
			Show.Controller.showCommunities.should.be.a( 'function' );

			Show.Controller.showCommunities();

			spy.should.have.callCount( 1 );
			spy.should.have.been.calledWithExactly( null, 'communities', 'communitiesBrowse' );
		} );

	} );
} );
