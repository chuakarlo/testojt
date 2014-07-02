define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Remoting = require( 'Remoting' );

	describe ( 'RecommendedCollection Collection', function () {
		var collection;
		var options;
		var appStub;
		var remoteStub;
		var appModel;
		var sampleModel;

		var fetchCheck = function () {
			App.when( collection.fetch( options ) ).done( function () {
				remoteStub.callCount.should.be.equal( 1 );
				options.success.callCount.should.be.equal( 1 );
				App.request( 'homepage:userTags' ).should.be.equal( appModel );
				Remoting.fetch( 'request' ).should.be.equal( sampleModel );
			} );
		};

		before ( function () {
			options = {
				'success' : sinon.spy(),
				'error'   : sinon.spy()
			};

			var Collection = require ( 'apps/homepage/external/content3/external/recommended/collections/RecommendedCollection' );
			collection  = new Collection();
			sampleModel = [ [ { 'id' : 1 }, { 'id' : 2 } ], [ { 'id' : 3 } ] ];
			appModel    = '3rd Grade,4th Grade,,ELA';
			appStub     = sinon.stub( App, 'request' ).returns( appModel );
			remoteStub  = sinon.stub( Remoting, 'fetch' ).returns( sampleModel );

		} );

		after ( function () {
			appStub.restore();
			remoteStub.restore();
		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			collection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'fetch() : success', function ( done ) {
			fetchCheck();
			done();
		} );
	} );
} );
