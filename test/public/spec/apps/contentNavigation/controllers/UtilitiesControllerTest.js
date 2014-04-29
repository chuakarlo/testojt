define( function ( require ) {
	'use strict';

	var sinon      = window.sinon;
    var Utils      = require( 'contentNavigation/controllers/UtilitiesController' );
    var Controller = require( 'contentNavigation/controllers/GridController' );

    describe( 'CN-Utilities Controller Test', function () {

		var gridController;
		var view;

		before( function () {
            gridController = new Controller();
            view           = gridController.getView();
            view.render();
        } );

       after( function () {
            gridController = undefined;
            view           = undefined;
        } );

		it( 'should be an object', function () {
			Utils.should.be.an( 'Object' );
		} );

		it( 'should have a throwError method', function () {
			Utils.should.have.property( 'throwError' );
			Utils.throwError.should.be.a( 'Function' );
		} );

		it( 'should have a scrollIndicator property', function () {
			Utils.should.have.property( 'scrollIndicator' );
			Utils.scrollIndicator.should.be.an( 'Object' );
		} );

		describe( 'throwError', function () {
			it( 'should be called with arguments', function () {
				var _mock = sinon.mock( Utils );

				_mock.expects( 'throwError' ).once().withArgs( 'message', 'name' );

				Utils.throwError( 'message', 'name' );

				_mock.verify();
				_mock.restore();
			} );

			it( 'should throw an Error', function () {
				try {
					Utils.throwError( 'Message', 'Name' );
				} catch( err ) {
					err.should.not.be.equal( 'undefined' );
					err.message.should.have.length.above( 0 );
					err.name.should.have.length.above( 0 );
				}
			} );
		} );

		describe( 'scrollIndicator', function () {
			it( 'should have init, onCreate, show and hide properties', function () {
				Utils.scrollIndicator.should.have.property( 'init' );
				Utils.scrollIndicator.should.have.property( 'onCreate' );
				Utils.scrollIndicator.should.have.property( 'show' );
				Utils.scrollIndicator.should.have.property( 'hide' );
			} );

			describe( 'init', function () {
				it( 'should be called with argument', function () {
					var _mock = sinon.mock( Utils.scrollIndicator );

					_mock.expects( 'init' ).once().withArgs( 'test param' );

					Utils.scrollIndicator.init( 'test param' );

					_mock.verify();
					_mock.restore();
				} );

			} );


			describe( 'onCreate', function () {
				it( 'should be called with argument', function () {
					var _mock = sinon.mock( Utils.scrollIndicator );

					_mock.expects( 'onCreate' ).once().withArgs( 'args' );

					Utils.scrollIndicator.onCreate( 'args' );

					_mock.verify();
					_mock.restore();
				} );

				it( 'should call the parameter if its a function', function () {
					var _mock = sinon.mock( Utils.scrollIndicator );

					_mock.expects( 'show' ).once();

					Utils.scrollIndicator.onCreate( Utils.scrollIndicator.show );

					_mock.verify();
					_mock.restore();

				} );
			} );

			describe( 'show', function () {
				it( 'should be called with argument', function () {
					var _mock = sinon.mock( Utils.scrollIndicator );

					_mock.expects( 'show' ).once().withArgs( 'element' );

					Utils.scrollIndicator.show( 'element' );

					_mock.verify();
					_mock.restore();
				} );
			} );

			describe( 'hide', function () {
				it( 'should be called with argument', function () {
					var _mock = sinon.mock( Utils.scrollIndicator );

					_mock.expects( 'hide' ).once().withArgs( 'element' );

					Utils.scrollIndicator.hide( 'element' );

					_mock.verify();
					_mock.restore();
				} );
			} );


		} );

    } );

} );