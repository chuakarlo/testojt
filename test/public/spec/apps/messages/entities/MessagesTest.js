define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );

	describe( 'Messages Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'Messages' );
		} );

	} );

	describe( 'Messages Test when initialized', function () {

		var model;

		before( function () {
			model = new App.Entities.Messages();
		} );

		after( function () {
			model = null;
		} );

		it( 'should be an instance of CFModel', function () {
			model.should.be.an.instanceof( Backbone.CFModel );
		} );

		it( 'should have property `getReadOptions` and `return`', function () {
			model.should.have.property( 'getReadOptions' );
			model.getReadOptions.should.be.a( 'function' );

			var options = model.getReadOptions();

			options.should.have.property( 'method' );
			options.method.should.equal( 'getUnreadCount' );

			options.should.have.property( 'args' );
			options.args.should.have.property( 'id' );
		} );

		it( 'should have property `path`', function () {
			model.should.have.property( 'path' );
			model.path.should.equal( 'friends.InternalMessagesGateway' );
		} );

	} );

} );
