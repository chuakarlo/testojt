define( function ( require ) {
	'use strict';

	// libraries
	var sinon     = window.sinon;

	require( 'spin' );

	var $ = require( 'jquery' );

	require( 'videoPlayer/plugins/selectText' );

	describe( '.selectText', function () {
		var $element = $( '<p>test</p>' );
		var selectSpy;

		before( function () {
			if ( document.body.createTextRange ) {
				selectSpy = sinon.spy( document.body, 'createTextRange' );
			} else if ( window.getSelection ) {
				selectSpy = sinon.spy( window, 'getSelection' );
			}
		} );

		after( function () {
			if ( document.body.createTextRange ) {
				document.body.createTextRange.restore();
			} else if ( window.getSelection ) {
				window.getSelection.restore();
			}
		} );

		it( 'does select the text of the element', function () {
			$element.selectText();
			selectSpy.should.have.been.called;
		} );

	} );

} );
