define( function ( require ) {

	'use strict';

	var $                          = require( 'jquery' );
	var sinon                      = window.sinon;
	var expect                     = require( 'chai' ).expect;
	var UUContentLibraryController = require( 'contentNavigation/controllers/userUploadedLibrary/UserUploadedContentLibraryController' );
	var Communicator               = require( 'contentNavigation/Communicator' );
	var vent                       = new Communicator();
	var Remoting                   = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'UserUploadedContentLibraryController', function () {

		var UserUploadedContentLibraryController;

		before( function () {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			UserUploadedContentLibraryController = new UUContentLibraryController( {
				App : App,
				vent : vent
			} );

		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'initialize', function () {
			it( 'should be an instance', function () {
				UserUploadedContentLibraryController.should.be.an.instanceof( UUContentLibraryController );
			} );

			it( 'contentLibraryType should equal to "UserUploadedContent"', function () {
				expect( UserUploadedContentLibraryController.contentLibraryType ).to.equal( 'UserUploadedContent' );
			} );

			it( 'should call _setContentController', function () {
				var _mock = sinon.mock( UserUploadedContentLibraryController );

				_mock.expects( '_setContentController' ).once();

				UserUploadedContentLibraryController._setContentController();

				_mock.verify();
				_mock.restore();
			} );

			it( 'should call _setFiltersController', function () {
				var _mock = sinon.mock( UserUploadedContentLibraryController );

				_mock.expects( '_setFiltersController' ).once();

				UserUploadedContentLibraryController._setFiltersController();

				_mock.verify();
				_mock.restore();
			} );
		} );

		describe( '_setVent', function () {
			it( 'vent should be defined', function () {
				expect( UserUploadedContentLibraryController.vent ).to.not.equal( undefined );
				expect( UserUploadedContentLibraryController.vent ).to.not.equal( null )
			} );
		} );	

		describe( '_setContentController', function () {

			it( 'contentLibraryType in contentController should be "UserUploadedContent"', function () {
				expect( UserUploadedContentLibraryController.contentController.contentLibraryType ).to.equal( 'UserUploadedContent' );
			} );

			it( 'contentController should be defined', function () {
				expect( UserUploadedContentLibraryController.contentController ).to.not.equal( undefined );
				expect( UserUploadedContentLibraryController.contentController ).to.not.equal( null );
			} );

		} );

		describe( '_setFiltersController', function () {

			it( 'contentLibraryType in filtersController should be "UserUploadedContent"', function () {
				expect( UserUploadedContentLibraryController.contentController.contentLibraryType ).to.equal( 'UserUploadedContent' );
			} );

			it( 'filtersController should be defined', function () {
				expect( UserUploadedContentLibraryController.filtersController ).to.not.equal( undefined );
				expect( UserUploadedContentLibraryController.filtersController ).to.not.equal( null );
			} );

		} );

		describe( '_verifyConfig', function () {
			it( '_verifyConfig should return true', function () {
				expect( UserUploadedContentLibraryController._verifyConfig( { vent : vent } ) ).to.equal( true );
			} );
		} );

	} );

} );