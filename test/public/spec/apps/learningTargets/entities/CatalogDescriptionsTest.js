define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	describe( 'CatalogDescriptions Test', function () {

		it( 'should exist on App.Entities', function () {
			App.should.have.property( 'Entities' );
			App.Entities.should.have.property( 'CatalogDescriptions' );
		} );

		describe( 'when initialized', function () {

			var model;

			before( function () {
				model = new App.Entities.CatalogDescriptions();
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

				var options       = model.getReadOptions();

				options.should.have.property( 'method' );
				options.method.should.equal( 'getResourceDetailsByCatalogIdAndCatalogResourceIdAndCatalogResourceTypeId' );

				options.should.have.property( 'args' );
				options.args.should.be.a( 'object' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'CatalogService' );
			} );

		} );

	} );

} );
