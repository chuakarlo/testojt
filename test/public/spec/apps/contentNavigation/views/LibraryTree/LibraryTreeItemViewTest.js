define( function ( require ) {
	'use strict';

	var LibraryTreeItemView = require( 'contentNavigation/views/LibraryTree/LibraryTreeItemView' );

	describe( 'CN-LibraryTreeItem View', function () {

		var libraryTreeItemView;

		before( function () {
			libraryTreeItemView = new LibraryTreeItemView();
		} );

		after( function () {
			libraryTreeItemView = undefined;
		} );

		it( 'should have "className" ', function () {
			libraryTreeItemView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			libraryTreeItemView.should.have.property( 'template' );
		} );

		it( 'should have "onRender" ', function () {
			libraryTreeItemView.should.have.property( 'onRender' );
		} );

		it( 'should be wrapped around a <li> element', function () {
			libraryTreeItemView.el.tagName.should.be.equal( 'LI' );
		} );

	} );

} );
