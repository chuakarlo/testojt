define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	describe( 'Forgot Password Model Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'SendPassword' );
		} );

		describe( 'when initialized', function () {

			var model;
			var userInfo;

			before( function () {
				userInfo = {
					persId : '13733'
				};

				model = new App.Entities.SendPassword();
				model.set( userInfo );

			} );

			after( function () {
				model = null;
			} );

			it( 'should be an instance of CFCollection', function () {
				model.should.be.an.instanceof( Backbone.CFModel );
			} );

			it( 'should have property getReadOptions', function () {
				model.should.have.property( 'getReadOptions' );
				model.getReadOptions.should.be.a( 'function' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'EmailService' );
			} );

		} );

	} );

} );
