define( function ( require ) {

	'use strict';

	var $                          = require( 'jquery' );
	var expect                     = require( 'chai' ).expect;
	var sinon                      = window.sinon;
	var UUContentController        = require( 'contentNavigation/controllers/userUploadedLibrary/UserUploadedContentController' );
	var UUContentLibraryController = require( 'contentNavigation/controllers/userUploadedLibrary/UserUploadedContentLibraryController' );
	var Communicator               = require( 'contentNavigation/Communicator' );
	var vent                       = new Communicator();
	var Remoting                   = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'UserUploadedContentController', function () {

		var UserUploadedContentLibraryController;
		var UserUploadedContentController;

		before( function ( ) {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			UserUploadedContentLibraryController = new UUContentLibraryController( {
				App : App,
				vent : vent
			} );

			UserUploadedContentController = new UUContentController( {
				App : App,
				vent : vent,
				contentLibraryType : UserUploadedContentLibraryController.contentController.contentLibraryType
			} );
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'initialize', function () {

			it( 'should be an instance', function () {
				UserUploadedContentController.should.be.an.instanceof( UUContentController );
			} );

			it( 'contentLibraryType should equal to "UserUploadedContent"', function () {
				expect( UserUploadedContentController.contentLibraryType ).to.equal( 'UserUploadedContent' );
			} );

			it( 'should call initializeCollection', function () {

				var _mock = sinon.mock( UserUploadedContentController );

				_mock.expects( 'initializeCollection' ).once();

				UserUploadedContentController.initializeCollection();

				_mock.verify();
				_mock.restore();

			} );

			it( 'should call initializeComponent', function () {

				var _mock = sinon.mock( UserUploadedContentController );

				_mock.expects( 'initializeComponent' ).once();

				UserUploadedContentController.initializeComponent();

				_mock.verify();
				_mock.restore();

			} );


			it( 'should call _createVents', function () {

				var _mock = sinon.mock( UserUploadedContentController );

				_mock.expects( '_createVents' ).once();

				UserUploadedContentController._createVents();

				_mock.verify();
				_mock.restore();

			} );

			it( 'should call initializeFetching', function () {

				var _mock = sinon.mock( UserUploadedContentController );

				_mock.expects( 'initializeFetching' ).once();

				UserUploadedContentController.initializeFetching();

				_mock.verify();
				_mock.restore();

			} );

		} );

		describe( '_getSegmentParams', function () {

			it( 'should return the correct object', function () {
				expect( UserUploadedContentController._getSegmentParams ).to.not.equal( undefined );
				expect( UserUploadedContentController._getSegmentParams() ).to.contain.keys( [
					'path', 'method', 'args'
				] );
			} );

		} );

	} );

} );