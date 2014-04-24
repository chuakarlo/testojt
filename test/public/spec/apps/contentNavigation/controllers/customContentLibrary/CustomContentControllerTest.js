define( function ( require ) {

	'use strict';

	var $                   = require( 'jquery' );
	var sinon               = window.sinon;
	var expect              = require( 'chai' ).expect;
	var CCController        = require( 'contentNavigation/controllers/customContentLibrary/CustomContentController' );
	var CCLibraryController = require( 'contentNavigation/controllers/customContentLibrary/CustomContentLibraryController' );
	var Communicator        = require( 'contentNavigation/Communicator' );
	var vent                = new Communicator();
	var Remoting            = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/utilitiesController' )
	};

	describe( 'CustomContentController', function () {

		var CustomContentController;
		var CustomContentLibraryController;

		before( function () {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			CustomContentLibraryController = new CCLibraryController( {
				App : App,
				vent : vent,
			} );

			CustomContentController = new CCController( {
				App : App,
				vent : vent,
				contentLibraryType : CustomContentLibraryController.contentController.contentLibraryType
			} );
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'initialize', function () {

			it( 'should be an instance', function () {
				CustomContentController.should.be.an.instanceof( CCController );
			} );

			it( 'contentLibraryType should equal to "CustomContent"', function () {
				expect( CustomContentController.contentLibraryType ).to.equal( 'CustomContent' );
			} );

			it( 'should call initializeCollection', function () {

				var _mock = sinon.mock( CustomContentController );

				_mock.expects( 'initializeCollection' ).once();

				CustomContentController.initializeCollection();

				_mock.verify();
				_mock.restore();

			} );

			it( 'should call initializeComponent', function () {

				var _mock = sinon.mock( CustomContentController );

				_mock.expects( 'initializeComponent' ).once();

				CustomContentController.initializeComponent();

				_mock.verify();
				_mock.restore();

			} );


			it( 'should call _createVents', function () {

				var _mock = sinon.mock( CustomContentController );

				_mock.expects( '_createVents' ).once();

				CustomContentController._createVents();

				_mock.verify();
				_mock.restore();

			} );

			it( 'should call initializeFetching', function () {

				var _mock = sinon.mock( CustomContentController );

				_mock.expects( 'initializeFetching' ).once();

				CustomContentController.initializeFetching();

				_mock.verify();
				_mock.restore();

			} );

		} );

		describe( '_getSegmentParams', function () {

			it( 'should return the correct object', function () {
				expect( CustomContentController._getSegmentParams ).to.not.equal( undefined );
				expect( CustomContentController._getSegmentParams() ).to.contain.keys( [
					'path', 'method', 'args'
				] );
			} );

		} );

		

	} );

} );