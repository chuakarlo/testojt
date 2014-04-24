define( function ( require ) {
	'use strict';

	var HeaderLayoutView = require( 'contentNavigation/views/Layouts/HeaderLayoutView' );

	describe( 'HeaderLayout View', function () {

		var headerLayoutView;
		var headerChildren;

		before( function () {
			headerLayoutView = new HeaderLayoutView();
			headerChildren   = headerLayoutView.render().$el.children();
		} );

		after( function () {
			headerLayoutView = undefined;
		} );

		it( 'should have "template" ', function () {
			headerLayoutView.should.have.property( 'template' );
		} );

		it( 'should have "itemView" ', function () {
			headerLayoutView.should.have.property( 'itemView' );
		} );

		it( 'should have "itemViewContainer" ', function () {
			headerLayoutView.should.have.property( 'itemViewContainer' );
		} );

		it( 'should render the view\'s template', function () {
			headerChildren.should.length.above( 0 );
		} );

		it( 'should be wrapped around a <div> element', function () {
			headerLayoutView.el.tagName.should.be.equal( 'DIV' );
		} );

	} );

} );
