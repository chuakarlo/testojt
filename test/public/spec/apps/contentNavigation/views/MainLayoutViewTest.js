define( function ( require ) {

	'use strict';

	var MainLayoutView = require( 'contentNavigation/views/MainLayoutView' );

	describe( 'CN-MainLayout View', function () {

		var mainLayoutView;
		var _renderedContent;

		before( function () {
			mainLayoutView   = new MainLayoutView();
			_renderedContent = mainLayoutView.render().$el;
		} );

		after( function () {
			mainLayoutView   = undefined;
			_renderedContent = undefined;
		} );

		it( 'should have "template" ', function () {
			mainLayoutView.should.have.property( 'template' );
		} );

		it( 'should have "regions" ', function () {
			mainLayoutView.should.have.property( 'regions' );
		} );

		it( 'should have "top region" ', function () {
			mainLayoutView.topRegion.el.should.be.equal( '#cn-top-region' );
		} );

		it( 'should have "left region" ', function () {
			mainLayoutView.leftRegion.el.should.be.equal( '#cn-left-region' );
		} );

		it( 'should have "center region" ', function () {
			mainLayoutView.centerRegion.el.should.be.equal( '#cn-middle-region' );
		} );

		it( 'should render the view\'s template', function () {
			_renderedContent.children().should.length.above( 0 );
		} );

		it( 'should be wrapped around a <div> element', function () {
			mainLayoutView.el.tagName.should.be.equal( 'DIV' );
		} );
	} );

} );