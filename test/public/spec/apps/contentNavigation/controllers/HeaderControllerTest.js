define( function( require ) {
    'use strict';

    var sinon        = window.sinon;
    var Controller   = require( 'contentNavigation/controllers/HeaderController' );
    var Communicator = require( 'contentNavigation/Communicator' );
    var $            = require( 'jquery' );
    var Remoting     = require( 'Remoting' );

    var vent;
    var headerController;
    var view;

    describe( 'CN-HeaderController Test', function () {

        before( function () {
            sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );

            vent                = new Communicator();
            headerController    = new Controller( {
                App     : {},
                vent    : vent
            } );

            view = headerController.getView();
            view.render();
        } );

        after( function () {
            Remoting.fetch.restore();
        } );

        it( 'should be a controller instance', function () {
            headerController.should.be.an.instanceof( Controller );
        } );

        describe( 'testing click event', function () {

            it( 'should call \'_sortByChanged\' upon click', function () {
                headerController.should.call( '_sortByChanged' ).when( function () {
                    return headerController.getView().$el.find( '.cn-sortby-menu li' ).click();
                } );
            } );

        } );

        describe( 'getView', function () {
            it( 'should have tagName', function () {
                view.el.tagName.should.be.equal( 'DIV' );
            } );
        } );

        describe( '_createVents', function () {
            it( 'can be called', function () {
                var _mock = sinon.mock( headerController );

                _mock.expects( '_createVents' ).once();

                headerController._createVents();

                _mock.verify();
                _mock.restore();
            } );

        });

        describe( '_sortByChanged', function () {

            it( 'should be called', function () {
                var _mock = sinon.mock( headerController );

                _mock.expects( '_sortByChanged' ).once();

                headerController._sortByChanged();

                _mock.verify();
                _mock.restore();
            } );

            it( 'should trigger the segment:sort event', function () {
                vent.mediator.should.trigger ( 'segment:sort' ).when( function () {
                    return headerController.getView().$el.find( '.cn-sortby-menu li' ).click();
                } );
            } );

            it( 'should call dropdown value', function () {
                headerController.should.call( '_getDropdownValue' ).when( function () {
                    return headerController.getView().$el.find( '.cn-sortby-menu li' ).click();
                } );
            } );

        } );

        describe( '_changeLibrary', function () {

            it( 'should be called', function () {
                var _mock = sinon.mock( headerController );

                _mock.expects( '_changeLibrary' ).once();

                headerController._changeLibrary();

                _mock.verify();
                _mock.restore();
            } );

        } );

        describe( '_getDropdownValue', function () {
            it( 'should return a string', function () {
                 var el  = $( '<div/>', { 'text': 'PD360' } );
                 var val = headerController._getDropdownValue( el );

                 val.should.be.equal( 'PD360' );
            } );
        });

    } );
} );