define( function ( require ) {
	'use strict';

	var SegmentCollectionEmptyView = require( 'contentNavigation/views/Segments/SegmentCollectionEmptyView' );

	describe( 'CN-SegmentCollectionEmpty View', function () {

		var segmentCollectionEmptyView;

		before( function () {
			segmentCollectionEmptyView = new SegmentCollectionEmptyView();
		} );

		after( function () {
			segmentCollectionEmptyView = undefined;
		} );

		it( 'should have "template" ', function () {
			segmentCollectionEmptyView.should.have.property( 'template' );
		} );

		it( 'should be wrapped around a <div> element', function () {
			segmentCollectionEmptyView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
