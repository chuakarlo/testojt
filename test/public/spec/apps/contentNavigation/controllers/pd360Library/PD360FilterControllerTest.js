define ( function ( require ) {
	'use strict';

	var expect           = require( 'chai' ).expect;
	var sinon            = window.sinon;
	var Component        = require( 'contentNavigation/components/FilterComponent' );
	var Controller       = require( 'contentNavigation/controllers/pd360Library/PD360FilterController' );
	var Collection       = require( 'contentNavigation/collections/FiltersCollection' );
	var Communicator     = require( 'contentNavigation/Communicator' );
	var Model            = require( 'contentNavigation/models/FilterModel' );
	var vent             = new Communicator();
	var filterController = new Controller( { vent : vent } );

	require( 'jquery' );
	require( 'jquery.pscrollbar' );

	describe( 'PD360FilterController Test', function() {

		var _filterCollection = new Collection( [
			new Model( {
				id     : 'filter-1',
	            title  : 'Default Filter'
			} ),
			new Model( {
				id     : 'filter-2',
				title  : 'Default Filter2'
			} )
		] );

		var _component = new Component( {
			vent              : vent,
			title             : 'Grades',
			id                : 'cn-grades-filter',
			columns	          : 2,
			itemViewContainer :	'.cn-content-filter',
			collection        : _filterCollection,
			collectionName    :	'gradesFilterCollection'
		} );

		describe( 'initialize', function () {

			it( 'should be an instance', function () {
				filterController.should.be.an.instanceof( Controller );
			} );

			it( 'initializeComponent should be called', function () {
				
				var _mock = sinon.mock( filterController );

				_mock.expects( 'initializeComponent' ).once();

				filterController.initializeComponent();

				_mock.verify();
				_mock.restore();

			} );

			it( '_createVents should be called', function () {
				
				var _mock = sinon.mock( filterController );

				_mock.expects( '_createVents' ).once();

				filterController._createVents( { vent : vent });

				_mock.verify();
				_mock.restore();

			} );			

		} );

		describe( 'createFilterComponents', function () {

			var _mock = sinon.mock( filterController );
			
			it( 'addFilterComponent method should be called thrice for adding the 3 components', function ( done ) {
				
				_mock.expects( 'addFilterComponent' ).thrice();
				
				filterController.createFilterComponents();
				
				_mock.verify();
				_mock.restore();

				done();

			} );

		} );

	} );
} );