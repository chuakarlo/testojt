define ( function ( require ) {
	'use strict';

	var expect           = require( 'chai' ).expect;
	var sinon            = window.sinon;
	var Component        = require( 'contentNavigation/components/FilterComponent' );
	var Controller       = require( 'contentNavigation/controllers/FiltersController' );
	var LayoutView       = require( 'contentNavigation/views/MainLayoutView' );
	var Collection       = require( 'contentNavigation/collections/FiltersCollection' );
	var Communicator     = require( 'contentNavigation/Communicator' );
	var Model            = require( 'contentNavigation/models/FilterModel' );
	var vent             = new Communicator();
	var filterController = new Controller( { vent : vent } );
	var MainView         = new LayoutView();

	require( 'jquery' );
	require( 'jquery.pscrollbar' );

	describe( 'FilterController Test', function() {

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

		it( 'should be an instance', function () {
			filterController.should.be.an.instanceof( Controller );
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

		describe( 'addFilterComponent', function () {
			var _mock = sinon.mock( filterController );

			it( 'should be called with arguments', function ( done ) {
				_mock.expects('addFilterComponent').once().withArgs( 'Test Component', _component );
				filterController.addFilterComponent( 'Test Component', _component );
				_mock.verify();
				_mock.restore();
				done();
			} );
			it( 'should add components', function () {
				filterController.createFilterComponents();
				filterController.components.should.contain.keys( 'gradesFilter', 'subjectsFilter', 'topicsFilter' );
			} );
		} );

		describe( '_filterChanged', function () {
			var _mock = sinon.mock( filterController );

			it( 'should call _buildFilters', function () {
				_mock.expects( '_buildFilters' ).once();
				filterController._filterChanged();
				_mock.verify();
				_mock.restore();
			} );

			it( 'should  trigger \'segment:filter\'', function () {
				vent.mediator.should.trigger( 'segment:filter' ).when( function () {
					return filterController._filterChanged();
				} );
			} );
		} );

		describe( 'selectedFilters', function () {
			it( 'should be initially empty', function () {
				expect( filterController.selectedFilters.empty );
			} );
		} );

		describe( '_createVents', function () {
			it( 'should have \'filter:changes\' in vent.mediator._events', function () {
				filterController.vent.mediator._events.should.contain.key( 'filter:change' );
				filterController.vent.mediator._events[ 'filter:change' ].should.be.an( 'Array' );
			} );

			it( 'should have \'scroll:unset\' in vent.mediator._events', function () {
				filterController.vent.mediator._events.should.contain.key( 'scroll:unset' );
				filterController.vent.mediator._events[ 'scroll:unset' ].should.be.an( 'Array' );
			} );
		} );

		describe( 'should return a view', function () {
			var _view = filterController.getView();
			it( 'should have a tagName', function () {
				_view.el.tagName.should.be.equal( 'DIV' );
			} );
		} );

		describe('_unsetFilterScroll', function () {
			var el = MainView.$el.find('div[id=cn-left-region]');

			it( 'should trigger perfectScrollbar plugin' , function () {
				var scrollEl = el.perfectScrollbar();
				scrollEl.trigger('scroll');
	        });
		});
	} );
} );