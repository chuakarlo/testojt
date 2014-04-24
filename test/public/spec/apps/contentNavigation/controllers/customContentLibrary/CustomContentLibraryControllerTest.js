define( function ( require ) {

	'use strict';

	var $                   = require( 'jquery' );
	var sinon               = window.sinon;
	var expect              = require( 'chai' ).expect;
	var CCLibraryController = require( 'contentNavigation/controllers/customContentLibrary/CustomContentLibraryController' );
	var Communicator        = require( 'contentNavigation/Communicator' );
	var vent                = new Communicator();
	var Remoting            = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'CustomContentLibraryController', function () {

		var CustomContentLibraryController;

		before( function () {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			CustomContentLibraryController = new CCLibraryController( {
				App : App,
				vent : vent
			} );

		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'initialize', function () {

			it( 'should be an instance', function () {
				CustomContentLibraryController.should.be.an.instanceof( CCLibraryController );
			} );

			it( 'contentLibraryType should equal to "CustomContent"', function () {
				expect( CustomContentLibraryController.contentLibraryType ).to.equal( 'CustomContent' );
			} );

			it( 'should call _setContentController', function () {
				var _mock = sinon.mock( CustomContentLibraryController );

				_mock.expects( '_setContentController' ).once();

				CustomContentLibraryController._setContentController();

				_mock.verify();
				_mock.restore();
			} );

			it( 'should call _setFiltersController', function () {
				var _mock = sinon.mock( CustomContentLibraryController );

				_mock.expects( '_setFiltersController' ).once();

				CustomContentLibraryController._setFiltersController();

				_mock.verify();
				_mock.restore();
			} );			

		} );

		describe( '_setVent', function () {

			it( 'vent should be defined', function () {
				expect( CustomContentLibraryController.vent ).to.not.equal( undefined );
				expect( CustomContentLibraryController.vent ).to.not.equal( null )
			} );

		} );

		describe( '_setContentController', function () {

			it( 'contentLibraryType in contentController should be "CustomContent"', function () {
				expect( CustomContentLibraryController.contentController.contentLibraryType ).to.equal( 'CustomContent' );
			} );

			it( 'contentController should be defined', function () {
				expect( CustomContentLibraryController.contentController ).to.not.equal( undefined );
				expect( CustomContentLibraryController.contentController ).to.not.equal( null );
			} );

		} );

		describe( '_setFiltersController', function () {

			it( 'contentLibraryType in filtersController should be "CustomContent"', function () {
				expect( CustomContentLibraryController.contentController.contentLibraryType ).to.equal( 'CustomContent' );
			} );

			it( 'filtersController should be defined', function () {
				expect( CustomContentLibraryController.filtersController ).to.not.equal( undefined );
				expect( CustomContentLibraryController.filtersController ).to.not.equal( null );
			} );

		} );

		describe( '_verifyConfig', function () {
			it( '_verifyConfig should return true', function () {
				expect( CustomContentLibraryController._verifyConfig( { vent : vent } ) ).to.equal( true );
			} );
		} );

	} );

} );