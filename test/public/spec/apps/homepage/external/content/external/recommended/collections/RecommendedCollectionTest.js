define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var App      = require( 'App' );
	var Remoting = require( 'Remoting' );

	describe ( 'RecommendedCollection Collection', function () {
		var collection;
		var Collection;
		var options;

		before ( function () {
			options = {
				'success' : sinon.spy(),
				'error' : sinon.spy()
			};

			Collection = require ( 'apps/homepage/external/content/external/recommended/collections/RecommendedCollection' );
			collection = new Collection();
		} );

		after ( function() {

		} );

		it ( 'should be an instance of Backbone Collection', function () {
			var Backbone = require( 'backbone' );
			collection.should.be.an.instanceof( Backbone.Collection );
		} );

		it( 'fetch() : success', function ( done ) {
			var sampleModel = [ { 'id' : 1 } ];
			var appModel    = '3rd Grade,4th Grade,,ELA';
			sinon.stub( App, 'request' ).returns( appModel );
			var remoteStub  = sinon.stub( Remoting, 'fetch' ).returns( sampleModel );

			App.when( collection.fetch( options ) ).done( function () {
				remoteStub.callCount.should.be.equal( 1 );
				options.success.callCount.should.be.equal( 1 );
				App.request( 'homepage:userTags' ).should.be.equal( appModel );
				Remoting.fetch( 'request' ).should.be.equal( sampleModel );
			} );

			Remoting.fetch.restore();
			App.request.restore();
			done();
		} );
	} );
} );