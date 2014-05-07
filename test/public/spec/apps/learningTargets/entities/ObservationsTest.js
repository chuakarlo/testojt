define( function ( require ) {
	'use strict';

	var sinon    = window.sinon;
	var Backbone = require( 'backbone' );
	var App      = require( 'App' );
	var $        = require( 'jquery' );

	describe( 'Observations Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'Observations' );
		} );

		describe( 'when initialized', function () {

			var model;

			before( function () {
				model = new App.Entities.Observations();
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
				options.method.should.equal( 'getObservationsByTargetIdWithPrescribedPDCount' );

				options.should.have.property( 'args' );
				options.args.should.have.property( 'targetId' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'ObservationService' );
			} );

		} );

		describe( 'when requesting `lt:observations`', function () {

			var result;
			var ajax;

			var fetch = function ( done ) {
				var fetching = App.request( 'lt:observations' );

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
					result.message.should.equal( 'Error fetching observations' );
				} );

			} );

			describe( 'and returns successfully', function () {

				before( function ( done ) {
					ajax = sinon.stub( $, 'ajax' );
					ajax.yieldsToAsync( 'success' );

					fetch( done );
				} );

				it( 'should return Observations', function () {
					result.should.be.an.instanceof( App.Entities.Observations );
				} );

			} );

		} );

	} );

} );
