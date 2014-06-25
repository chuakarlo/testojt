define( function ( require ) {
	'use strict';

	var BaseObj = require( 'apps/homepage/BaseObject' );
	var base    = require( 'apps/homepage/external/widgets/external/null/base' );

	describe ( 'Base Test for null', function () {

		it ( 'should be an instance of BaseObject', function () {
			base.should.be.an.instanceof( BaseObj );
		} );

		it( 'should have property WidgetId', function () {
			base.should.have.property( 'WidgetId' );
			base.WidgetId.should.be.equal( 0 );
		} );

		it( 'should have property WidgetName', function () {
			base.should.have.property( 'WidgetName' );
		} );

		it( 'should have property header', function () {
			base.should.have.property( 'header' );
		} );

		it( 'should have property footer', function () {
			base.should.have.property( 'footer' );
		} );

		it( 'should have property Description', function () {
			base.should.have.property( 'Description' );
			base.Description().should.be.equal( '' );
		} );

		it( 'should have property imgSrc', function () {
			base.should.have.property( 'imgSrc' );
			base.imgSrc().should.be.equal( '' );
		} );

		it( 'should have property icon', function () {
			base.should.have.property( 'icon' );
			base.icon().should.be.equal( '' );
		} );

		it( 'should have property em equal to 8.5', function () {
			base.should.have.property( 'em' );
			base.em.should.be.equal( 8.5 );
		} );

	} );

} );
