define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var expect   = require( 'chai' ).expect;

	describe ( 'ContentModel Test', function () {

		var model;

		it( 'should be an instance of Backbone.Model', function () {

			var Model  = require( 'apps/homepage/external/content/models/ContentModel' );
			model      = new Model();
			expect( model ).to.be.an.instanceof( Backbone.Model );

		} );

	} );
} );
