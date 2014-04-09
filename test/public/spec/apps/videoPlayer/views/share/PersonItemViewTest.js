define( function ( require ) {
	'use strict';

	// test libraries
	var sinon = window.sinon;

	// dependency modules
	var PersonItemView = require( 'videoPlayer/views/share/PersonItemView' );

	describe( 'PersonItemView', function () {

		var personItemView;

		before( function () {
			personItemView = new PersonItemView();
		} );

		after( function () {
			personItemView = undefined;
		} );

		it( 'does have `.template`', function () {
			personItemView.should.have.property( 'template' );
		} );

		it( 'does have `.tagName`', function () {
			personItemView.should.have.property( 'tagName' );
		} );

		it( 'does have `.ui`', function () {
			personItemView.should.have.property( 'ui' );
		} );

		it( 'does have `.triggers`', function () {
			personItemView.should.have.property( 'triggers' );
		} );

	} );

} );
