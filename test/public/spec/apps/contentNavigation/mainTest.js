define ( function ( require ) {
	'use strict';

	var $            = require( 'jquery' );
	var sinon        = window.sinon;
	var Controller   = require( 'contentNavigation/main' );
	var async        = require( 'async' );
	var Communicator = require( 'contentNavigation/Communicator' );
	var Remoting     = require( 'Remoting' );

	var views			= {
		'MainLayoutView'	: require('contentNavigation/views/MainLayoutView')
	};

	var subControllers	= {
		'HeaderController'           : require( 'contentNavigation/controllers/HeaderController' ),
		'ContentLibraryController'   : require( 'contentNavigation/controllers/ContentLibraryController' )
	};

	var vent              = null;
	var mainController    = null;
	var mainView          = new views.MainLayoutView( );
	var headerController  = null;
	var libraryController = null;
	var App               = { };

	App.topRegion     = mainView.topRegion;
	App.leftRegion    = mainView.leftRegion;
	App.centerRegion  = mainView.centerRegion;

	before( function ( ) {

		sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

		vent             = new Communicator();
		mainController   = new Controller();

		headerController = new subControllers.HeaderController( {
            'App'  : App,
			'vent' : vent
        } );

		libraryController = new subControllers.ContentLibraryController( {
            'App'  : App,
			'vent' : vent
        } );
	} );

	after( function () {
		Remoting.fetch.restore();
	} );


	describe( 'Main Test', function() {

		it( 'should be and instance', function () {
			mainController.should.be.an.instanceof( Controller );
		} );

		it( 'should create MainView', function () {
			mainController.MainView.should.be.an.instanceof( views.MainLayoutView );
		} );

		it( 'should call controllers', function () {
			mainController.should.have.a.property( 'createControllers' );
		} );

		describe( 'Create Main View' , function () {

			it( 'should call main header method', function () {
				mainController.should.have.a.property( 'createMainViewHeader' );
			} );

			describe( 'Create Main Header', function () {
				it( 'should create header view', function () {

					var topRegion = mainController.getTopRegion();

					topRegion.show( headerController.getView() );

					topRegion.on( 'show', function ( view ) {
						view.$el.children().should.have.length.above( 0 );
					} );
				} );
			} );
		} );

		describe( 'Call Controllers', function () {

			async.series( [

				function ( ) {

						it( 'should call header controller', function () {
							headerController.should.have.a.property( 'collection' );
							headerController.should.have.a.property( 'options' );
						} );
					},

				function ( ) {

					it( 'should call library controller', function () {
						libraryController.should.have.a.property( 'collection' );
						libraryController.should.have.a.property( 'options' );
					} );
				}

			], function ( ) {

			} );

		} );

		describe( 'Create Top Region', function () {
			it( 'should return top region view', function () {
				mainView.should.have.a.property( 'topRegion' );
			} );
		} );

		describe('Create Left Region', function () {
			it( 'should return left region view', function () {
				mainView.should.have.a.property( 'leftRegion' );
			} );
		} );

		describe('Create Center Region', function () {
			it( 'should return center region view', function () {
				mainView.should.have.a.property( 'centerRegion' );
			} );
		} );

	} );
} );