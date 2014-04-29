define( function ( require ) {
	'use strict';

	var LibraryTreeCompositeView = require( 'contentNavigation/views/LibraryTree/LibraryTreeCompositeView' );

	describe( 'CN-LibraryTreeComposite View', function () {

		var libraryTreeCompositeView;

		before( function () {
			libraryTreeCompositeView = new LibraryTreeCompositeView();
			libraryTreeCompositeView.initialize = false;
		} );

		after( function () {
			libraryTreeCompositeView = undefined;
		} );

		it( 'should have "itemView" ', function () {
			libraryTreeCompositeView.should.have.property( 'itemView' );
		} );

		it( 'should have "itemViewContainer" ', function () {
			libraryTreeCompositeView.should.have.property( 'itemViewContainer' );
		} );

		it( 'should have "template" ', function () {
			libraryTreeCompositeView.should.have.property( 'template' );
		} );

		it( 'should have "initialize" ', function () {
			libraryTreeCompositeView.should.have.property( 'onBeforeItemAdded' );
		} );

		it( 'should have "onBeforeRender" ', function () {
			libraryTreeCompositeView.should.have.property( 'onBeforeRender' );
		} );

		it( 'should have "onRender" ', function () {
			libraryTreeCompositeView.should.have.property( 'onRender' );
		} );

		it( 'should be wrapped around a <div> element ', function () {
			libraryTreeCompositeView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
