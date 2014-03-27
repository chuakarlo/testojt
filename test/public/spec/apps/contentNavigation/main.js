define ( function ( require ) {
	'use strict';

	var Controller       = require( 'contentNavigation/main' );
	var mainController = new Controller();

	var views			= {
		'MainLayoutView'	: require('contentNavigation/views/MainLayoutView')
	};


	describe( 'Main Test', function() {
		it( 'should be and instance', function () {
			mainController.should.be.an.instanceof( Controller );
		} );

		it( 'should have a MainView', function () {
			mainController.MainView.should.be.an.instanceof( views.MainLayoutView );
		} );

	} );
} );