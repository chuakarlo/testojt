/*
 * Main Collection Object under external.
 */

define( function ( require ) {
	'use strict';

	var SectionCollection = require( 'external/collections/SectionCollection' );
	var Sectionmodel      = require( 'external/models/SectionModel' );
	var expect            = require( 'chai' ).expect;

	describe( 'SectionCollection Collection', function () {

		before ( function () {
			this.sectionCollection = new SectionCollection();
		} );

		it( 'should be an instance of SectionCollection Collection', function () {
			expect( this.sectionCollection ).to.be.an.instanceof( SectionCollection );
		} );

		it( 'should have a model of SectionModel instance', function () {
			var model = new this.sectionCollection.model();
			expect ( model ).to.be.an.instanceof( Sectionmodel );
		} );

	} );

} );