define( function ( require ) {
	'use strict';

	// test libraries
	var $     = require( 'jquery' );
	var sinon = window.sinon;

	// dependency modules
	var App              = require( 'App' );
	var Remoting         = require( 'Remoting' );
	var GroupsCollection = require( 'videoPlayer/collections/GroupsCollection' );

	describe( 'GroupsCollection', function () {

		var groupsCollection;

		before( function () {
			groupsCollection = new GroupsCollection();
		} );

		after( function () {
			groupsCollection = undefined;
		} );

		it( 'does have a `model` property', function () {
			groupsCollection.should.have.property( 'model' );
		} );

		it( 'does have a `url` property', function () {
			groupsCollection.should.have.property( 'url' );
			groupsCollection.url.should.eql( 'com.schoolimprovement.pd360.dao.SearchService' );
		} );

		describe( '`.fetch`', function () {

			var request;
			var options;
			var remotingStub;
			var stub;

			before( function () {
				stub = sinon.stub().returns( false );
				App.reqres.setHandler( 'pd360:available', stub );

				remotingStub = sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
				request      = {};
				options      = {
					'success' : function () {},
					'error'   : function () {}
				};

				groupsCollection.fetch( request, options );
			} );

			after( function () {
				stub = null;
				App.reqres.removeHandler( 'pd360:available' );

				Remoting.fetch.restore();
			} );

			it( 'does fetch data', function () {
				remotingStub.should.have.callCount( 1 );
			} );

		} );

	} );

} );
