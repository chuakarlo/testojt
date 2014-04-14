define( function ( require ) {
	'use strict';

	var Marionette             = require( 'marionette' );
	var expect                 = require( 'chai' ).expect;
	var WhatToDoNextLayoutView = require( 'external/external/what-to-do-next/layout/WhatToDoNextLayout' );

	describe( 'WhatToDoNextLayoutView Layout', function () {
		before ( function () {
			this.layout = new WhatToDoNextLayoutView();
		} );

		it( 'should be an instance of Layout', function () {
			expect( this.layout ).to.be.an.instanceof( Marionette.Layout );
		} );

		it( 'should have a template', function () {
			expect( this.layout.template ).to.not.be.equal( undefined );
		} );

		it( 'should have an Active Region', function () {
			var activeRegion = this.layout.regions.activeWidgets;
			expect( activeRegion ).to.not.be.equal( undefined );
			expect( this.layout.activeWidgets ).to.be.an.instanceof( Marionette.Region );
		} );

		it( 'should have an Inactive Region', function () {
			var inactiveRegion = this.layout.regions.inactiveWidgets;
			expect( inactiveRegion ).to.not.be.equal( undefined );
			expect( this.layout.inactiveWidgets ).to.be.an.instanceof( Marionette.Region );
		} );

		it( 'should have a className', function () {
			expect( this.layout.className ).to.not.be.equal( undefined );
		} );

	} );

} );