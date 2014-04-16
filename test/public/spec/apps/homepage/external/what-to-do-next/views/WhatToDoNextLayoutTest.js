define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var expect     = require( 'chai' ).expect;

	describe( 'WhatToDoNextLayoutView Layout', function () {

		var layout;

		before ( function () {
			var WhatToDoNextLayoutView = require( 'apps/homepage/external/what-to-do-next/layout/WhatToDoNextLayout' );
			layout                = new WhatToDoNextLayoutView();
		} );

		it( 'should be an instance of Layout', function () {
			expect( layout ).to.be.an.instanceof( Marionette.Layout );
		} );

		it( 'should have a template', function () {
			expect( layout.template ).to.not.be.equal( undefined );
		} );

		it( 'should have an Active Region', function () {
			var activeRegion = layout.regions.activeWidgets;
			expect( activeRegion ).to.not.be.equal( undefined );
			expect( layout.activeWidgets ).to.be.an.instanceof( Marionette.Region );
		} );

		it( 'should have an Inactive Region', function () {
			var inactiveRegion = layout.regions.inactiveWidgets;
			expect( inactiveRegion ).to.not.be.equal( undefined );
			expect( layout.inactiveWidgets ).to.be.an.instanceof( Marionette.Region );
		} );

		it( 'should have a className', function () {
			expect( layout.className ).to.not.be.equal( undefined );
		} );

	} );

} );