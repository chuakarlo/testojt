define( function ( require ) {
	'use strict';

	var LicenseItemView = require( 'contentNavigation/views/Licenses/LicenseItemView' );

	describe( 'LicenseItem View', function () {

		var licenseItemView;

		before( function () {
			licenseItemView = new LicenseItemView ();
		} );

		after( function () {
			licenseItemView = undefined;
		} );

		it( 'should have "className" ', function () {
			licenseItemView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			licenseItemView.should.have.property( 'template' );
		} );

		it( 'should be wrapped around a <li> element', function () {
			licenseItemView.el.tagName.should.be.equal( 'LI' );
		} );

	} );

} );
