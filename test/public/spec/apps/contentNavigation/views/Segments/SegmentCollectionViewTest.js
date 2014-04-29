define( function ( require ) {
	'use strict';

	var SegmentCollectionView = require( 'contentNavigation/views/Segments/SegmentCollectionView' );

	describe( 'CN-SegmentCollection View', function () {

		var segmentCollectionView;
		var segmentCollectionChildren;

		before( function () {
			segmentCollectionView     = new SegmentCollectionView();
			segmentCollectionChildren = segmentCollectionView.render().$el.children();
		} );

		after( function () {
			segmentCollectionView  = undefined;
		} );

		it( 'should have "className" ', function () {
			segmentCollectionView .should.have.property( 'className' );
		} );

		it( 'should have "tagName" ', function () {
			segmentCollectionView .should.have.property( 'tagName' );
		} );

		it( 'should have "emptyView" ', function () {
			segmentCollectionView .should.have.property( 'emptyView' );
		} );

		it( 'should have "itemView" ', function () {
			segmentCollectionView .should.have.property( 'itemView' );
		} );

		it( 'should render the view\'s template', function () {
			segmentCollectionChildren.should.length.above( 0 );
		} );

		it( 'should be wrapped around a <ul> element', function () {
			segmentCollectionView .el.tagName.should.be.equal( 'UL' );
		} );

	} );

} );
