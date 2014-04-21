define ( function ( requir ) {
	'use strict';

	var BaseObj            = require( 'external/BaseObject' );
	var base               = require( 'external/external/what-to-do-next/base' );
	var WhatToDoNextLayout = require( 'external/external/what-to-do-next/layout/WhatToDoNextLayout' );
	var expect             = require( 'chai' ).expect;

	describe( 'baseTest for What-To-Do-Next', function () {

		it( 'should be an instance of BaseObject', function () {
			expect( base ).to.be.an.instanceof( BaseObj );
		} );

		it( 'getExternalView should return WhatToDoNextLayout ', function () {
			var view = base.getExternalView;
			expect( view ).to.be.equal( WhatToDoNextLayout );
		} );

	} );
} );