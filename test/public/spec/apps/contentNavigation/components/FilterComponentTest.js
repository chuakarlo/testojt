define( function ( require ) {
	'use strict';

	var $            = require( 'jquery' );
	var expect       = require( 'chai' ).expect;
	var Collection   = require( 'contentNavigation/collections/FilterCollection' );
	var Component    = require( 'contentNavigation/components/FilterComponent' );
	var Communicator = require( 'contentNavigation/Communicator' );
	var Model        = require( 'contentNavigation/models/FilterModel' );

	describe( 'FilterComponent Test', function () {
		var _gradeCollection = new Collection( [
				new Model( {
					id    : 'grade-pre-k',
					title : 'Pre-K'
				} )
			] );
		var	_filterComponent = new Component( {
				vent       : new Communicator(),
				title      : 'Grades',
				id         : 'cn-grades-filter',
				collection : _gradeCollection
		} );

		describe( 'setTitle and getTitle', function () {
			it( 'should return a title', function () {
				var _returnTitle = _filterComponent.getTitle();
				_returnTitle.should.be.equal( 'Grades' );
			} );
		} );
		describe( 'setComponentId and getComponentId', function () {
			it( 'should return an id', function () {
				var _returnComponentId = _filterComponent.getComponentId();
				_returnComponentId.should.be.equal( 'cn-grades-filter' );
			} );
		} );
		describe( 'setCollection and getCollection', function () {

			var _returnCollection;
			beforeEach( function () {
				_returnCollection = _filterComponent.getCollection();
			} );
			afterEach( function () {
				_returnCollection = null;
			} );
			it( 'should return a collection', function () {
				_returnCollection.length.should.be.above( 0 );
			} );
			it( 'should have model keys', function () {
				_returnCollection.at( 0 ).attributes.should.contain.keys( 'id', 'title' );
			} );
		} );

		describe( 'createView and getView', function () {
			var _returnView = _filterComponent.getView();
			_returnView.render();
			_returnView.$el.appendTo( $( '#fixtures' ) );

			it( 'should return an id', function () {
				_returnView.id.should.be.equal( 'cn-grades-filter' );
			} );
			it( 'should have selected filters when filter is clicked', function () {
				_returnView.$el.find( 'label.cn-filter-list' ).click();
				_filterComponent.flattenedSelectedFilters.should.contain( 'grade-pre-k' );
			} );

			it( 'should call clearFilters when clear filter is clicked', function () {
				_filterComponent.should.call( 'clearFilters'  ).when( function () {
					return _returnView.$el.find( 'span' ).click();
				} );
			} );
		} );

		describe( '_addFilter', function() {
			var	_returnView = _filterComponent.getView();
				_returnView.render();
				_returnView.$el.appendTo( $( '#fixtures' ) );
			var	_el         = _returnView.$el.find( 'label' );


			it( 'should add filter', function ( done ) {
				_filterComponent._addFilter( _el, new Model( {
					id    : 'grade-Pre-K',
					title : 'Pre-K'
				} ) );
				_filterComponent.selectedFilters.should.be.an( 'Object' );
				_filterComponent.selectedFilters.should.contain.key( 'grade-Pre-K' );
				done();
			} );
			it( 'should trigger \'filter:change\'', function ( done ) {
				_filterComponent.vent.mediator.should.trigger( 'filter:change' ).when( function () {
					return _filterComponent._addFilter( _el, new Model( {
						id    : 'grade-Pre-K',
						title : 'Pre-K'
					} ) );
				} );
				done();
			} );
		} );

		describe( '_removeFilter', function () {
			var	_returnView = _filterComponent.getView();
				_returnView.render();
				_returnView.$el.appendTo( $( '#fixtures' ) );
			var	_el         = _returnView.$el.find( 'label' );
			var	_modelData  = new Model( {
					id    : 'grade-Pre-K',
					title : 'Pre-K'
				} );

			it( 'should remove filter', function ( done ) {
				_filterComponent._addFilter( _el, _modelData );
				_filterComponent._removeFilter( _el, _modelData );
				expect( _filterComponent.selectedFilters ).not.contain.keys( 'grade-Pre-K' );
				done();
			} );

			it( 'should trigger \'filter:change\'', function ( done ) {
				_filterComponent.vent.mediator.should.trigger( 'filter:change' ).when( function () {
					return _filterComponent._addFilter( _el, new Model( {
						id    : 'grade-Pre-K',
						title : 'Pre-K'
					} ) );
				} );
				done();
			} );
		} );

		describe( 'clearFilters' , function () {
			it( 'should clear filters', function () {
				_filterComponent.clearFilters( _filterComponent.selectedFilters );
				expect( _filterComponent.selectedFilters ).to.be.empty;
			} );
		} );

	} );
} );