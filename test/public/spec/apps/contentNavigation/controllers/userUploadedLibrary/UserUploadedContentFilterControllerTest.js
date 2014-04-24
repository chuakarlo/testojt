define( function ( require ) {

	'use strict';

	var $                          = require( 'jquery' );
	var sinon                      = window.sinon;
	var expect                     = require( 'chai' ).expect;
	var UUContentFilterController  = require( 'contentNavigation/controllers/userUploadedLibrary/UserUploadedContentFilterController' );
	var UUContentLibraryController = require( 'contentNavigation/controllers/userUploadedLibrary/UserUploadedContentLibraryController' );
	var Communicator               = require( 'contentNavigation/Communicator' );
	var vent                       = new Communicator();
	var Remoting                   = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'UserUploadedContentFilterController', function () {

		var UserUploadedContentLibraryController;
		var UserUploadedContentFilterController;

		before( function () {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			UserUploadedContentLibraryController = new UUContentLibraryController( {
				App : App,
				vent : vent
			} );

			UserUploadedContentFilterController = new UUContentFilterController( {
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
				UserUploadedContentFilterController.should.be.an.instanceof( UUContentFilterController );
			} );

			it( 'contentLibraryType should equal to "UserUploadedContent"', function () {
				expect( UserUploadedContentFilterController.contentLibraryType ).to.equal( 'UserUploadedContent' );
			} );

			it( 'should call initializeComponent', function () {

				var _mock = sinon.mock( UserUploadedContentFilterController );

				_mock.expects( 'initializeComponent' ).once();

				UserUploadedContentFilterController.initializeComponent();

				_mock.verify();
				_mock.restore();

			} );

			it( 'should call _createVents', function () {

				var _mock = sinon.mock( UserUploadedContentFilterController );

				_mock.expects( '_createVents' ).once();

				UserUploadedContentFilterController._createVents();

				_mock.verify();
				_mock.restore();

			} );

		} );

		describe( 'createFilterComponents', function () {

			it( 'should render Filter Component Container', function () {
				expect( UserUploadedContentFilterController.getView().$el[ 0 ].className ).to.equal( 'cn-filters-container' );
			} );
			
		} );

	} );

} );