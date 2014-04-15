define( function ( require ) {
	'use strict';

var Backbone = require( 'backbone' );

var BillboardModel = require( 'apps/homepage/external/billboard/model/BillboardModel' );
// var BillboardModel = Backbone.Model.extend( {
// 		'idAttribute' : 'BillboardId',
// 	} );
var BillboardCollection = require( 'apps/homepage/external/billboard/collection/BillboardCollection' );

	var	model = new BillboardModel;

	describe( 'Billboard Test', function () {

	// model
		describe( 'Model', function () {
			describe( 'when initialized', function () {

				it( 'should be an instance of Backbone Model', function () {
					model.should.be.an.instanceof(Backbone.Model);
				} );

				it( 'should have property idAttribute', function () {
				model.should.have.property( 'idAttribute' );
			} );

			} );
		} ); // end of model test

		describe( 'Collection', function () {
			describe( 'when initialized', function () {
					var collection;

						before( function () {
							collection = new BillboardCollection;
						} );

						after( function() {
							collection = null;
						} );

						it( 'should be an instance of Backbone Collection', function () {
							collection.should.be.an.instanceof(Backbone.Collection);
						} );

			} ); //end of init
		} ); // end of collection Test



	} ); // end of Billboard

} );