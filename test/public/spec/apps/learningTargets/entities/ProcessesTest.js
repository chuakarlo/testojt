define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	describe( 'Processes Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'Processes' );
		} );

		describe( 'when initialized', function () {

			var model;

			before( function () {
				model = new App.Entities.Processes();
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
				options.method.should.equal( 'getExtByEducatorForLearningTargets' );

				options.should.have.property( 'args' );
				options.args.should.have.property( 'educId' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'process.ProcessGateway' );
			} );

		} );

		describe( 'when requesting `lt:processes`', function () {

			var result;
			var ajax;

			var fetch = function ( done ) {
				var fetching = App.request( 'lt:processes' );

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
					result.message.should.equal( 'Error fetching processes' );
				} );

			} );

			describe( 'and returns successfully', function () {

				before( function ( done ) {
					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsToAsync( 'success' );

					fetch( done );
				} );

				it( 'should return Processes', function () {
					result.should.be.an.instanceof( App.Entities.Processes );
				} );

			} );

		} );

	} );

} );
