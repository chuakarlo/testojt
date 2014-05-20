define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	describe( 'Catalogs Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'Catalogs' );
		} );

		describe( 'when initialized', function () {

			var model;

			before( function () {
				model = new App.Entities.Catalogs();
			} );

			after( function () {
				model = null;
			} );

			it( 'should be an instance of CFCollection', function () {
				model.should.be.an.instanceof( Backbone.CFCollection );
			} );

			it( 'should have property getReadOptions and return options', function () {
				model.should.have.property( 'getReadOptions' );
				model.getReadOptions.should.be.a( 'function' );

				var options = model.getReadOptions();

				options.should.have.property( 'method' );
				options.method.should.equal( 'getUsersIncompleteCatalogItems' );

				options.should.have.property( 'args' );
				options.args.should.have.property( 'personnelId' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'catalog.ClientPersonnelResourceTranscriptGateway' );
			} );

		} );

		describe( 'when requesting `lt:catalogs`', function () {

			var result;
			var ajax;

			var fetch = function ( done ) {
				var fetching = App.request( 'lt:catalogs' );

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
					result.message.should.equal( 'Error fetching catalogs' );
				} );

			} );

			describe( 'and returns successfully', function () {

				before( function ( done ) {
					App.reqres.setHandler( 'pd360:available', function () { return false; } );
					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsToAsync( 'success' );

					fetch( done );
				} );

				it( 'should return Catalogs', function () {
					result.should.be.an.instanceof( App.Entities.Catalogs );
				} );

			} );

		} );

	} );

} );
