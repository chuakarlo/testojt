define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var GroupItemView = require( 'videoPlayer/views/share/GroupItemView' );

	describe( 'GroupItemView', function () {

		var groupItemView;

		before( function () {
			groupItemView = new GroupItemView();
		} );

		after( function () {
			groupItemView = undefined;
		} );

		it( 'does have `.template`', function () {
			groupItemView.should.have.property( 'template' );
		} );

		it( 'does have `.tagName`', function () {
			groupItemView.should.have.property( 'tagName' );
		} );

		it( 'does have `.ui`', function () {
			groupItemView.should.have.property( 'ui' );
		} );

		it( 'does have `.triggers`', function () {
			groupItemView.should.have.property( 'triggers' );
		} );

	} );

} );
