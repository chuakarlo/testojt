define( function ( require ) {
	'use strict';

	// test libraries
	var $     = require( 'jquery' );
	var sinon = window.sinon;

	// dependency modules
	var App              = require( 'App' );
	var Remoting         = require( 'Remoting' );
	var PeopleCollection = require( 'videoPlayer/collections/PeopleCollection' );

	describe( 'PeopleCollection', function () {

		var peopleCollection;

		before( function () {
			peopleCollection = new PeopleCollection();
		} );

		after( function () {
			peopleCollection = undefined;
		} );

		it( 'does have a `model` property', function () {
			peopleCollection.should.have.property( 'model' );
		} );

		it( 'does have a `url` property', function () {
			peopleCollection.should.have.property( 'url' );;
			peopleCollection.url.should.eql( 'com.schoolimprovement.pd360.dao.SearchService' );
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

				peopleCollection.fetch( request, options );
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
