define( function ( require ) {
	'use strict';

	// dependency modules
	var FilterCompositeView = require( 'contentNavigation/views/Filters/FilterCompositeView' );

	describe( 'CN-FilterComposite View', function () {

		var filterCompositeView;

		before( function () {
			filterCompositeView = new FilterCompositeView ();
		} );

		after( function () {
			filterCompositeView = undefined;
		} );

		it( 'should have "itemView" ', function () {
			filterCompositeView.should.have.property( 'itemView' );
		} );

		it( 'should have "itemViewContainer" ', function () {
			filterCompositeView.should.have.property( 'itemViewContainer' );
		} );

		it( 'should have "ui" ', function () {
			filterCompositeView.should.have.property( 'ui' );
		} );

		it( 'should have "className" ', function () {
			filterCompositeView.should.have.property( 'className' );
		} );

		it( 'should have "template" ', function () {
			filterCompositeView.should.have.property( 'template' );
		} );

		it( 'should have "onBeforeItemAdded" ', function () {
			filterCompositeView.should.have.property( 'onBeforeItemAdded' );
		} );

		it( 'should have "onBeforeRender" ', function () {
			filterCompositeView.should.have.property( 'onBeforeRender' );
		} );

		it( 'should render the view\'s template', function () {
			//segmentItemChildren.should.length.above( 0 );
		} );

		it( 'should be wrapped around a <div> element ', function () {
			filterCompositeView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
