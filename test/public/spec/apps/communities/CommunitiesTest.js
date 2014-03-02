define( function ( require ) {
	'use strict';

	var communitiesModule = require( 'apps/communities/Communities' );
	var sinon             = window.sinon;

	var Communities;
	var App;
	var API;

	var stub;
	var spy;

	describe( 'Communities Module', function () {

		beforeEach( function () {
			App = {
				'addInitializer' : function () {},
				'module'         : function () {}
			};

			Communities = {
				'Router' : function () {}
			};

			API = {
				'checkSession'    : function () {},
				'showCommunities' : function () {}
			};
		} );

		afterEach( function () {
			Communities = null;
			App     = null;
			API     = null;

			stub = null;
			spy  = null;
		} );

		it( 'should create module `Communities.Show`', function () {
			spy  = sinon.spy( App, 'module' );

			communitiesModule( Communities, App );

			spy.should.have.callCount( 1 );
			spy.should.have.been.calledWith( 'Communities.Show' );
		} );

		it( 'should call `addInitializer` on App', function () {
			spy = sinon.spy( App, 'addInitializer' );

			communitiesModule( Communities, App );

			spy.should.have.callCount( 1 );
		} );

		it( 'should listen for app route `communities`', function () {
			communitiesModule( Communities, App );

			var Router = new Communities.Router( { 'controller' : API } );

			Router.should.have.property( 'appRoutes' );
			Router.appRoutes.should.have.property( 'communities' );
			Router.appRoutes.communities.should.be.an.instanceOf( Array );
			Router.appRoutes.communities.should.eql( [ 'checkSession', 'showCommunities' ] );
		} );

	} );

} );
