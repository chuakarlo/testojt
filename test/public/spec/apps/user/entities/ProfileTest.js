define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	describe( 'User Profile Model Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'Profile' );
		} );

		describe( 'when initialized', function () {

			var model;

			before( function () {
				model = new App.Entities.Profile();
			} );

			after( function() {
				model = null;
			} );

			it( 'should be an instance of CFModel', function () {
				model.should.be.an.instanceof( Backbone.CFModel );
			} );

			it( 'should have property getReadOptions and return options', function () {
				model.should.have.property( 'getReadOptions' );
				model.getReadOptions.should.be.a( 'function' );

				var options = model.getReadOptions();

				options.should.have.property( 'method' );
				options.method.should.equal( 'getById' );

				options.should.have.property( 'args' );
				options.args.should.have.property( 'id' );
			} );

			it( 'should return an object for getUpdateOptions', function () {
				model.should.have.property( 'getUpdateOptions' );
				model.getUpdateOptions.should.be.a( 'function' );

				var options = model.getUpdateOptions();

				options.should.have.property( 'method' );
				options.method.should.equal( 'update' );

				options.should.have.property( 'objectPath' );
				options.objectPath.should.equal( 'core.ClientPersonnelProfile' );

				options.should.have.property( 'args' );
			} );

			it( 'should not return an object for getDeleteOptions', function () {
				model.should.have.property( 'getDeleteOptions' );
				model.getDeleteOptions.should.be.a( 'function' );

				var options = model.getDeleteOptions();
				var expect  = window.chai.expect;

				expect( options ).to.be.a( 'undefined' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'core.ClientPersonnelProfileGateway' );
			} );

		} );

		describe( 'when requesting `user:profile`', function () {

			var result, ajax;

			var fetch = function ( done ) {
				var fetching = App.request( 'user:profile' );

				$.when( fetching ).always( function ( res ) {
					result = res;
					done();
				} );
			};

			afterEach( function () {
				App.reqres.removeHandler( 'pd360:available' );
				$.ajax.restore();
				result = null;
				ajax   = null;
			} );

			describe( 'and an error occurs', function () {

				before( function ( done ) {
					App.reqres.setHandler( 'pd360:available', function () { return false; } );
					var err = new Error();

					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsTo( 'error', err );

					fetch( done );
				} );

				it( 'should return an error message', function () {

					result.should.be.an.instanceof( Error );
					result.message.should.equal( 'Error fetching profile' );

				} );

			} );

			describe( 'and returns successfully', function () {

				before( function ( done ) {
					App.reqres.setHandler( 'pd360:available', function () { return false; } );
					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsToAsync( 'success', { 'test' : true } );

					fetch( done );
				} );

				it( 'should return a Profile model', function () {

					result.should.be.an.instanceof( App.Entities.Profile );
					result.get( 'test' ).should.equal( true );

				} );

			} );

		} );

	} );

} );
