define( function( require ) {
    'use strict';

    var sinon        = window.sinon;   
    var Controller   = require( 'contentNavigation/controllers/HeaderController' );
    var Communicator = require( 'contentNavigation/Communicator' );

    var vent;
    var headerController;
    var view;

    describe( 'HeaderController Test', function () {

        before( function () {
            vent                = new Communicator();
            headerController    = new Controller( {
                vent    : vent
            } );

            view = headerController.getView();
            view.render();
        } );


        it( 'should be a controller instance', function () {
            headerController.should.be.an.instanceof( Controller );
        } );


        describe( 'testing click event', function () {
            it( 'should call \'_sortByChanged\' upon click', function () {
                headerController.should.call( '_sortByChanged' ).when( function () {
                    return headerController.getView().$el.find( '.dropdown-menu li' ).click();
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


        describe( '_getSortByValue', function () {
            it( 'should get called', function () {
                var _mock = sinon.mock( headerController );

                _mock.expects( '_getSortByValue' ).once();

                headerController._getSortByValue();

                _mock.verify();
                _mock.restore();
            });

            it( 'should get the sortby Value', function(){
                var _sortByValue = headerController._getSortByValue();
                var _sortOptions = [ 'Release Date', 'A-Z' ];

                _sortOptions.should.contain( _sortByValue );
            } );

        } );


        describe( '_sortByChanged', function () {

            it( 'should be called', function () {
                var _mock = sinon.mock( headerController );

                _mock.expects( '_sortByChanged' ).once();

                headerController._sortByChanged();

                _mock.verify();
                _mock.restore();
            } );

            it( 'should call the _getSortByValue method', function () {
                var _mock = sinon.mock( headerController );

                _mock.expects( '_getSortByValue' ).once();

                headerController._sortByChanged();

                _mock.verify();
                _mock.restore();
            } );

            it( 'should trigger the segment:sort event', function () {
                vent.mediator.should.trigger ( 'segment:sort' ).when( function () {
                    return headerController._sortByChanged();
                } );
            } );

        } );

    } );
} );