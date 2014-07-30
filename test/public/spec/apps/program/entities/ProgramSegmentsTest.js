define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	describe( 'Program Segments Test', function () {

		it( 'should exist on App.Entities', function () {
			App.Program.should.have.property( 'Entities' );
			App.Program.Entities.should.have.property( 'Segments' );
		} );

		describe( 'when initialized', function () {

			var model;

			var fakeVideo = {
				'ContentId'       : 0,
				'ContentParentId' : 0,
				'ContentTypeId'   : 0
			};

			before( function () {
				model = new App.Program.Entities.Segments();
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
				options.method.should.equal( 'getProgramFromSegment' );
				options.should.have.property( 'args' );
				options.args = fakeVideo;
				options.args.should.have.property( 'ContentId' );
			} );

			it( 'should have property path', function () {
				model.should.have.property( 'path' );
				model.path.should.equal( 'ContentService' );
			} );

		} );

	} );

} );
