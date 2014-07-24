define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	describe( 'Notifications Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'Notifications' );
		} );

	} );

	describe( 'Notifications Test when initialized', function () {

		var collection;

		before( function () {
			collection = new App.Entities.Notifications();
		} );

		after( function () {
			collection = null;
		} );

		it( 'should be an instance of CFCollection', function () {
			collection.should.be.an.instanceof( Backbone.CFCollection );
		} );

		it( 'should have property `getReadOptions` and `return`', function () {
			collection.should.have.property( 'getReadOptions' );
			collection.getReadOptions.should.be.a( 'function' );

			var options = collection.getReadOptions();

			options.should.have.property( 'method' );
			options.method.should.equal( 'getInbox' );

			options.should.have.property( 'args' );
			options.args.should.have.property( 'id' );
			options.args.should.have.property( 'startRow' );
			options.args.should.have.property( 'numRows' );
			options.args.should.have.property( 'filter' );
		} );

		it( 'should have property `path`', function () {
			collection.should.have.property( 'path' );
			collection.path.should.equal( 'friends.InternalMessagesGateway' );
		} );

		it( 'should have property `comparator`', function () {
			collection.should.have.property( 'comparator' );
			collection.comparator.should.be.a( 'function' );
		} );

		it( 'should have property `changeSortBy`', function () {
			collection.should.have.property( 'changeSortBy' );
			collection.changeSortBy.should.be.a( 'function' );
		} );

		it( 'should have property `strategies`', function () {
			collection.should.have.property( 'strategies' );
			collection.strategies.should.be.a( 'object' );

			collection.strategies.should.have.property( 'date' );
			collection.strategies.date.should.be.a( 'function' );

			collection.strategies.should.have.property( 'sender' );
			collection.strategies.sender.should.equal( 'CreatorFullName' );
		} );

	} );

} );
