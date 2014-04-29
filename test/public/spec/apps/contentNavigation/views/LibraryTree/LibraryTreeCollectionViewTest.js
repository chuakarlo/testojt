define( function ( require ) {
	'use strict';

	var LibraryTreeCollectionView = require( 'contentNavigation/views/LibraryTree/LibraryTreeCollectionView' );

	describe( 'CN-LibraryTreeCollection View', function () {

		var libTreeCollectionView;

		before( function () {
			libTreeCollectionView = new LibraryTreeCollectionView( { initlialize: false } );
			console.log( libTreeCollectionView  );
		} );

		after( function () {
			libTreeCollectionView = undefined;
		} );

		it( 'should have "itemView" ', function () {
			libTreeCollectionView.should.have.property( 'itemView' );
		} );

		it( 'should have "className" ', function () {
			libTreeCollectionView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			libTreeCollectionView.should.have.property( 'template' );
		} );

		it( 'should have "itemViewContainer" ', function () {
			libTreeCollectionView.should.have.property( 'itemViewContainer' );
		} );

		it( 'should have "initialize" ', function () {
			libTreeCollectionView.should.have.property( 'initialize' );
		} );

		it( 'should have "onRender" ', function () {
			libTreeCollectionView.should.have.property( 'onRender' );
		} );

		it( 'should be wrapped around a <div> element ', function () {
			libTreeCollectionView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
