define( function ( require ) {

	'use strict';

	var $                   = require( 'jquery' );
	var sinon               = window.sinon;
	var expect              = require( 'chai' ).expect;
	var CCFilterController  = require( 'contentNavigation/controllers/customContentLibrary/CustomContentFilterController' );
	var CCLibraryController = require( 'contentNavigation/controllers/customContentLibrary/CustomContentLibraryController' );
	var Communicator        = require( 'contentNavigation/Communicator' );
	var vent                = new Communicator();
	var Remoting            = require( 'Remoting' );

	var App = {
		Utils : require( 'contentNavigation/controllers/UtilitiesController' )
	};

	describe( 'CustomContentFilterController', function () {

		var CustomContentLibraryController;
		var CustomContentFilterController;

		before( function () {
			sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

			CustomContentLibraryController = new CCLibraryController( {
				App : App,
				vent : vent
			} );

			CustomContentFilterController = new CCFilterController( {
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
				CustomContentFilterController.should.be.an.instanceof( CCFilterController );
			} );

			it( 'contentLibraryType should equal to "CustomContent"', function () {
				expect( CustomContentFilterController.contentLibraryType ).to.equal( 'CustomContent' );
			} );

			it( 'should call initializeComponent', function () {

				var _mock = sinon.mock( CustomContentFilterController );

				_mock.expects( 'initializeComponent' ).once();

				CustomContentFilterController.initializeComponent();

				_mock.verify();
				_mock.restore();

			} );

			it( 'should call _createVents', function () {

				var _mock = sinon.mock( CustomContentFilterController );

				_mock.expects( '_createVents' ).once();

				CustomContentFilterController._createVents();

				_mock.verify();
				_mock.restore();

			} );

		} );

		describe( 'createFilterComponents', function () {

			it( 'should render Filter Component Container', function () {
				expect( CustomContentFilterController.getView().$el[ 0 ].className ).to.equal( 'cn-filters-container' );
			} );

		} );

	} );

} );