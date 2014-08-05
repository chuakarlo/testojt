define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	// Test modules
	var sinon = window.sinon;

	var App = require( 'App' );
	// VideoStore
	require( 'homepage/stores/VideosStore' );

	describe( 'Homepage.Stores.VideosStore', function () {

		var recommendedVideos = new Backbone.Collection();
		var queuedVideos = new Backbone.Collection();

		// stubs
		var storeAddStub = sinon.stub();
		var storeRemoveStub = sinon.stub();

		before( function () {
			App.Homepage.Stores.VideosStore.queuedVideos = queuedVideos;
			App.Homepage.Stores.VideosStore.recommendedVideos = recommendedVideos;
		} );

		// Queue collection event listeners
		it( 'should trigger queue collection "store:item:added" on queue', function () {
			queuedVideos.on( 'store:model:added', storeAddStub );
			App.vent.trigger( 'common:queued', new Backbone.Model() );

			storeAddStub.should.have.callCount( 1 );
		} );

		it( 'should trigger queue collection "store:item:removed" on queue', function () {
			queuedVideos.on( 'store:model:added', storeRemoveStub );
			App.vent.trigger( 'common:queued', new Backbone.Model() );

			storeRemoveStub.should.have.callCount( 1 );
		} );

	} );

} );
