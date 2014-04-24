define( function ( require ) {

	'use strict';

	var $      = require( 'jquery' );
	var expect = require( 'chai' ).expect;
	var sinon  = window.sinon;

	var ContentController = require( 'contentNavigation/controllers/pd360Library/PD360ContentController' );
	var LibraryController = require( 'contentNavigation/controllers/pd360Library/PD360LibraryController' );
	var Communicator      = require( 'contentNavigation/Communicator' );
	var vent              = new Communicator();
	var Remoting          = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'PD360ContentController', function () {

		var PD360LibraryController;
		var PD360ContentController;

		before( function ( ) {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			PD360LibraryController = new LibraryController( {
				App : App,
				vent : vent
			} );

			PD360ContentController = new ContentController( {
				App : App,
				vent : vent,
				contentLibraryType : PD360LibraryController.contentController.contentLibraryType
			} );
		} );

		after( function () {
			Remoting.fetch.restore();
		} );

		describe( 'initialize', function () {

			it( 'should be an instance', function () {
				PD360ContentController.should.be.an.instanceof( ContentController );
			} );

			it( 'contentLibraryType should equal to "PD360Content"', function () {
				expect( PD360ContentController.contentLibraryType ).to.equal( 'PD360Content' );
			} );

			it( 'initializeCollection should be called', function () {
				
				var _mock = sinon.mock( PD360ContentController );

				_mock.expects( 'initializeCollection' ).once();

				PD360ContentController.initializeCollection( { vent : vent } );

				_mock.verify();
				_mock.restore();

			} );

			it( 'initializeComponent should be called', function () {
				
				var _mock = sinon.mock( PD360ContentController );

				_mock.expects( 'initializeComponent' ).once();

				PD360ContentController.initializeComponent();

				_mock.verify();
				_mock.restore();

			} );

			it( '_createVents should be called', function () {
				
				var _mock = sinon.mock( PD360ContentController );

				_mock.expects( '_createVents' ).once();

				PD360ContentController._createVents( { vent : vent } );

				_mock.verify();
				_mock.restore();

			} );

			it( 'initializeFetching should be called', function () {
				
				var _mock = sinon.mock( PD360ContentController );

				_mock.expects( 'initializeFetching' ).once();

				PD360ContentController.initializeFetching();

				_mock.verify();
				_mock.restore();

			} );

		} );

		describe( '_getSegmentParams', function () {

			it( 'should return the correct object', function () {
				expect( PD360ContentController._getSegmentParams ).to.not.equal( undefined );
				expect( PD360ContentController._getSegmentParams() ).to.contain.keys( [
					'path', 'method', 'args'
				] );
			} );

		} );

	} );

} );