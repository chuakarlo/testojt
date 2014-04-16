/*
 * Main Layout Object
 */
define( function ( require ) {
	'use strict';

	var Marionette    = require( 'marionette' );
	var SectionLayout = require( 'external/views/SectionLayout' );
	var expect        = require( 'chai' ).expect;

	describe( 'SectionLayout Layout', function () {

		var sectionLayout;

		before( function () {
			sectionLayout = new SectionLayout();
		} );

		it( 'should be an instance of SectionLayout Layout', function () {
			expect( sectionLayout ).to.be.an.instanceof( Marionette.Layout );
		} );

		it( 'should have Regions', function () {
			expect( sectionLayout.regions ).to.not.equal( {} );
		} );

		it( 'should have Home Region', function () {
			expect( sectionLayout.regions.home ).to.contain( 'home' );
		} );

		it( 'should have a Template', function () {
			expect( sectionLayout.template ).to.not.be.equal( undefined );
		} );

	} );

} );