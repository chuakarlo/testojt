define( function ( require ) {

	'use strict';

	var $            = require( 'jquery' );
	var expect       = require( 'chai' ).expect;
	var sinon        = window.sinon;
	var Controller   = require( 'contentNavigation/controllers/pd360Library/PD360LibraryController' );
	var Communicator = require( 'contentNavigation/Communicator' );
	var vent         = new Communicator();
	var Remoting     = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'PD360LibraryController', function () {

		var PD360LibraryController = null;

		before( function () {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			PD360LibraryController = new Controller( {
				App : App,
				vent : vent
			} );
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'initialize', function () {

			it( 'should be an instance', function () {
				PD360LibraryController.should.be.an.instanceof( Controller );
			} );

			it( 'contentLibraryType should equal to "PD360Content"', function () {
				expect( PD360LibraryController.contentController.contentLibraryType ).to.equal( 'PD360Content' );
			} );

			it( 'should call _setContentController', function () {
				var _mock = sinon.mock( PD360LibraryController );

				_mock.expects( '_setContentController' ).once();

				PD360LibraryController._setContentController();

				_mock.verify();
				_mock.restore();
			} );

			it( 'should call _setFiltersController', function () {
				var _mock = sinon.mock( PD360LibraryController );

				_mock.expects( '_setFiltersController' ).once();

				PD360LibraryController._setFiltersController();

				_mock.verify();
				_mock.restore();
			} );

		} );

		describe( '_setVent', function () {

			it( 'vent should be defined', function () {
				expect( PD360LibraryController.vent ).to.not.equal( undefined );
				expect( PD360LibraryController.vent ).to.not.equal( null )
			} );

		} );

		describe( '_setContentController', function () {

			it( 'contentLibraryType in contentController should be "PD360Content"', function () {
				expect( PD360LibraryController.contentController.contentLibraryType ).to.equal( 'PD360Content' );
			} );

			it( 'contentController should be defined', function () {
				expect( PD360LibraryController.contentController ).to.not.equal( undefined );
				expect( PD360LibraryController.contentController ).to.not.equal( null );
			} );

		} );

		describe( '_setFiltersController', function () {

			it( 'contentLibraryType in filtersController should be "PD360Content"', function () {
				expect( PD360LibraryController.contentController.contentLibraryType ).to.equal( 'PD360Content' );
			} );

			it( 'filtersController should be defined', function () {
				expect( PD360LibraryController.contentController ).to.not.equal( undefined );
				expect( PD360LibraryController.contentController ).to.not.equal( null );
			} );

		} );

		describe( '_verifyConfig', function () {
			it( '_verifyConfig should return true', function () {
				expect( PD360LibraryController._verifyConfig( { vent : vent } ) ).to.equal( true );
			} );
		} );

	} );

} );