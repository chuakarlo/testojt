define( function( require ) {
    'use strict';

    var expect                        = require( 'chai' ).expect;
    var sinon                         = window.sinon;
    var Component                     = require( 'contentNavigation/components/FilterComponent' );
    var Collection                    = require( 'contentNavigation/collections/FiltersCollection' );
    var Model                         = require( 'contentNavigation/models/FilterModel' );
    var FilterBaseMixin               = require( 'contentNavigation/controllers/base/filterBase' );
    var PD360FilterController         = require( 'contentNavigation/controllers/pd360Library/PD360FilterController' );
    var CustomContentFilterController = require( 'contentNavigation/controllers/customContentLibrary/CustomContentFilterController' );
    var UserUploadedFilterController  = require( 'contentNavigation/controllers/userUploadedLibrary/UserUploadedContentFilterController' );
    var View                          = require( 'contentNavigation/views/Filters/FilterContainerView' );
    var Utils                         = require( 'contentNavigation/controllers/UtilitiesController' );
    var Communicator                  = require( 'contentNavigation/Communicator' );
    var $                             = require( 'jquery' );

    require( 'jquery.pscrollbar' );


    describe( 'Filter Base Mixin Test', function () {

        var vent = new Communicator();
        var view = new View();

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
            columns           : 2,
            itemViewContainer : '.cn-content-filter',
            collection        : _filterCollection,
            collectionName    : 'gradesFilterCollection'
        } );

        describe( 'initializeComponent', function () {

                it( 'should create PD360 filter components' ,function ( ) {
                    var pd360Controller = new PD360FilterController( {
                        vent : vent
                    } );

                    var _mock = sinon.mock( pd360Controller );

                    _mock.expects( 'createFilterComponents' ).once();

                    pd360Controller.createFilterComponents();

                    _mock.verify();
                    _mock.restore();
                } );

                it( 'should create Custom Content filter components' ,function ( ) {
                    var ccController = new CustomContentFilterController( {
                        vent : vent
                    } );

                    var _mock = sinon.mock( ccController  );

                    _mock.expects( 'createFilterComponents' ).once();

                    ccController.createFilterComponents();

                    _mock.verify();
                    _mock.restore();
                } );

                it( 'should create User uploaded filter components' ,function ( ) {
                    var uuController = new UserUploadedFilterController( {
                        vent : vent
                    } );

                    var _mock = sinon.mock( uuController );

                    _mock.expects( 'createFilterComponents' ).once();

                    uuController.createFilterComponents();

                    _mock.verify();
                    _mock.restore();
                } );

                it( 'should set filter scroll' ,function ( ) {
                     var _mock = sinon.mock( FilterBaseMixin );

                    _mock.expects( '_setFilterScroll' ).once();

                    FilterBaseMixin._setFilterScroll();

                    _mock.verify();
                    _mock.restore();
                } );

                it( 'should instantiate scroll indicator ' ,function ( ) {
                    var _mock = sinon.mock( Utils.scrollIndicator );

                    _mock.expects( 'init' ).once();

                    Utils.scrollIndicator.init();

                    _mock.verify();
                    _mock.restore();
                } );

         } );

        describe( 'getView', function () {
            it( 'should have a view',function ( ) {
                view.$el.should.have.length.above( 0 );
            } );
         } );


        describe( 'Filter Methods' ,function ( ) {
             var pd360Controller = new PD360FilterController( {
                vent : vent
            } );

            describe( 'addFilterComponent', function () {

                var _mock = sinon.mock( pd360Controller );

                it( 'should be called with arguments', function ( done ) {
                    _mock.expects('addFilterComponent').once().withArgs( 'Test Component', _component );
                    pd360Controller.addFilterComponent( 'Test Component', _component );
                    _mock.verify();
                    _mock.restore();
                    done();
                } );
                it( 'should add components', function () {
                    pd360Controller.createFilterComponents();
                    pd360Controller.components.should.contain.keys( 'gradesFilter', 'subjectsFilter', 'topicsFilter' );
                } );
            } );

            describe( '_filterChanged', function () {

                var _mock = sinon.mock( pd360Controller  );

                it( 'should call _buildFilters', function () {
                    _mock.expects( '_buildFilters' ).once();
                    pd360Controller._filterChanged();
                    _mock.verify();
                    _mock.restore();
                } );

                it( 'should  trigger \'segment:filter\'', function () {
                    vent.mediator.should.trigger( 'segment:filter' ).when( function () {
                        return pd360Controller._filterChanged();
                    } );
                } );
            } );

            describe( 'selectedFilters', function () {
                it( 'should be initially empty', function () {
                    expect( pd360Controller.selectedFilters.empty );
                } );
            } );

            describe( '_createVents', function () {
                it( 'should have \'filter:changes\' in vent.mediator._events', function () {
                    pd360Controller.vent.mediator._events.should.contain.key( 'filter:change' );
                    pd360Controller.vent.mediator._events[ 'filter:change' ].should.be.an( 'Array' );
                } );

                it( 'should have \'scroll:hideShowScroll\' in vent.mediator._events', function () {
                    pd360Controller.vent.mediator._events.should.contain.key( 'scroll:hideShowScroll' );
                    pd360Controller.vent.mediator._events[ 'scroll:hideShowScroll' ].should.be.an( 'Array' );
                } );
            } );

        } );

        describe ('_setFilterHeight', function ( ) {
            it( 'should call the _getFilterHeight method', function () {
                FilterBaseMixin.should.call( '_getFilterHeight' ).satisfy( function () {
                    return $(window).resize();
                } );
            } );

            it ( 'should trigger perfectScrollbar plugin' , function () {
                var el = $('<div/>');
                var scrollEl = el.perfectScrollbar();
                scrollEl.trigger( 'scroll' );
            } );
        } );

        describe ( '_getFilterHeight', function () {
            it ( 'should return a number' , function () {
                var  getFilterHeight = parseInt ( FilterBaseMixin._getFilterHeight() );
                getFilterHeight.should.have.to.be.a( 'number' );
            } );
        } );

        describe( '_setFilterScroll', function () {
            var el = $('<div/>');

            it ( 'should trigger perfectScrollbar plugin' , function () {
                var scrollEl = el.perfectScrollbar();
                scrollEl.trigger( 'scroll' );
            } );
        } );

        describe( '_hideShowFilterScroll', function () {
             var el = $('<div/>');

            it ( 'should update perfectScrollbar plugin' , function () {
                FilterBaseMixin.should.call( '_updateFilterScroll' ).satisfy( function () {
                    return el.click();
                } );
            } );

            it ( 'should destroy perfectScrollbar plugin' , function () {
                FilterBaseMixin.should.call( '_destroyFilterScroll' ).satisfy( function () {
                    return el.click();
                } );
            } );
        } );

        describe( '_updateFilterScroll', function () {
             var el = $('<div/>');

            it ( 'should update perfectScrollbar' , function () {
                var scrollEl = el.perfectScrollbar( 'update' );
                scrollEl.trigger( 'scroll' );
            } );
        } );

        describe( '_destroyFilterScroll', function () {
             var el = $('<div/>');

            it ( 'should destroy perfectScrollbar plugin' , function () {
                var scrollEl = el.perfectScrollbar( 'destroy' );
                scrollEl.trigger( 'scroll' );
            } );
        } );

    } );
} );