/*
 * Main Collection Object under external.
 */

define( function ( require ) {
	'use strict';

	var SectionCollection = require( 'external/collections/SectionCollection' );
	var Sectionmodel      = require( 'external/models/SectionModel' );
	var expect            = require( 'chai' ).expect;

	describe( 'SectionCollection Collection', function () {

		var sectionCollection;

		before ( function () {
			sectionCollection = new SectionCollection();
		} );

		it( 'should be an instance of SectionCollection Collection', function () {
			expect( sectionCollection ).to.be.an.instanceof( SectionCollection );
		} );

		it( 'should have a model of SectionModel instance', function () {
			var model = new sectionCollection.model();
			expect ( model ).to.be.an.instanceof( Sectionmodel );
		} );

	} );

} );