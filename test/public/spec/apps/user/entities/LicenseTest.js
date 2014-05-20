define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	describe( 'User License Collection Test', function () {

		var stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function () {
			App.reqres.removeHandler( 'pd360:available' );
		} );

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'LicenseCollection' );
		} );

		describe( 'when initialized', function () {

			var collection;

			before( function () {
				collection = new App.Entities.LicenseCollection();
			} );

			after( function() {
				collection = null;
			} );

			it( 'should be an instance of CFCollection', function () {
				collection.should.be.an.instanceof( Backbone.CFCollection );
			} );

			it( 'should have property getReadOptions and return options', function () {
				collection.should.have.property( 'getReadOptions' );
				collection.getReadOptions.should.be.a( 'function' );

				var options = collection.getReadOptions();

				options.should.have.property( 'method' );
				options.method.should.equal( 'getUsersLicenses' );

				options.should.have.property( 'args' );
				options.args.should.have.property( 'id' );
			} );

			it( 'should not return an object for getUpdateOptions', function () {
				collection.should.have.property( 'getUpdateOptions' );
				collection.getUpdateOptions.should.be.a( 'function' );

				var options = collection.getUpdateOptions();
				var expect  = window.chai.expect;

				expect( options ).to.be.a( 'undefined' );
			} );

			it( 'should not return an object for getDeleteOptions', function () {
				collection.should.have.property( 'getDeleteOptions' );
				collection.getDeleteOptions.should.be.a( 'function' );

				var options = collection.getDeleteOptions();
				var expect  = window.chai.expect;

				expect( options ).to.be.a( 'undefined' );
			} );

			it( 'should have property path', function () {
				collection.should.have.property( 'path' );
				collection.path.should.equal( 'SessionService' );
			} );

		} );

		describe( 'when requesting `user:licenses`', function () {

			var result, ajax;

			var fetch = function ( done ) {
				App.request( 'user:licenses:reset' );
				var fetching = App.request( 'user:licenses' );

				$.when( fetching ).always( function ( res ) {
					result = res;
					done();
				} );
			};

			afterEach( function () {
				$.ajax.restore();
				result = null;
				ajax   = null;
			} );

			describe( 'and an error occurs', function () {

				before( function ( done ) {
					var err = new Error();

					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsTo( 'error', err );

					fetch( done );
				} );

				it( 'should return an error message', function () {

					result.should.be.an.instanceof( Error );
					result.message.should.equal( 'Error fetching licenses' );

				} );

			} );

			describe( 'and returns successfully', function () {

				before( function ( done ) {
					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsToAsync( 'success', { 'test' : true } );

					fetch( done );
				} );

				it( 'should return a LicenseCollection', function () {
					result.should.be.an.instanceof( App.Entities.LicenseCollection );

					var model = result.at( 0 ).attributes;
					model.should.have.property( 'test' );
					model.test.should.equal( true );
				} );

			} );

		} );

	} );

} );
