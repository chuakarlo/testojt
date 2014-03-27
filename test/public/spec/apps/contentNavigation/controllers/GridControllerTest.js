define ( function ( require ) {
	'use strict';

	var sinon      = window.sinon;
	var Controller = require( 'contentNavigation/controllers/GridController' );
	var gridController;

	var view;

	describe( 'GridController Test', function() {

		 before( function () {
            gridController = new Controller();
            view           = gridController.getView();
            view.render();
        } );

		it( 'should be an instance', function () {
			gridController.should.be.an.instanceof( Controller );
		} );

		it( 'should have getView function', function () {
			gridController.should.have.property( 'getView' );
		} );

		describe( 'getView', function () {

			it( 'can be called', function () {
				var _mock = sinon.mock( gridController );

				_mock.expects( 'getView' ).once();

				gridController.getView();

				_mock.verify();
				_mock.restore();
			} );

			it( 'return value should have a region', function () {
				view.regions.mainRegion.should.be.equal( '#grid-content' );
			} );
		} );

	} );
} );