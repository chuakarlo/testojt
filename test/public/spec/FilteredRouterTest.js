define( function( require ) {
	'use strict';

	var sinon          = window.sinon;
	var FilteredRouter = require('FilteredRouter');

	describe( 'FilteredRouter Tests', function() {
		var SomeRouter;
		var router;
		var controller;

		afterEach( function() {
			Backbone.history.navigate('');
		} );

		before( function() {

			window.router_filter = true;

			controller = {
				'fooMethod' : sinon.spy(),
				'barMethod' : sinon.spy(),
				'argMethod' : sinon.spy()
			}

			SomeRouter = FilteredRouter.extend( {

				'before' : {
					'^test' : function() {
						if (window.router_filter) {
							return true;
						}
						return false;
					}
				},

				'after' : {
					'^test' : sinon.spy() 
				},

			} );

			router = new SomeRouter( {

				controller : controller,

				'appRoutes' : {
					'foo'               : 'fooMethod',
					'test/bar'          : 'barMethod',
					'test/bar(/:page)'  : 'argMethod'
				},

			} );
			Backbone.history.start();
		} );

		it( 'should be an instance of FilteredRouter', function() {
			router.should.be.instanceof(SomeRouter);
		} );


		describe( 'Routes defined with "appRoutes" and a controller - Marionette way', function() {
			var beforeSpy;
			var afterSpy;

			before( function() {
				beforeSpy = sinon.spy(router.before, '^test');
				afterSpy = router.after['^test'];
			} );

			afterEach( function() { 
				beforeSpy.reset();
				afterSpy.reset();
			} );

			it ( 'should still respond to routes defined the Marionette way', function() {
				router.navigate( 'foo', {'trigger' : true} );
				controller.fooMethod.should.have.been.called;
			} );

			describe( 'Before Filter returns true', function() {

				it( 'should call the function matching the url regex', function() {
					router.navigate( 'test/bar', {'trigger' : true} );
					beforeSpy.should.have.been.called;
				} );

				it( 'should respond to url matching one of the before filters', function() {
					router.navigate( 'test/bar', {'trigger' : true} );
					controller.barMethod.should.have.been.called;
				} );

				it( 'should call the matching after function', function() {
					router.navigate( 'test/bar', {'trigger' : true} );
					afterSpy.should.have.been.called;
				} );

				it( 'should pass along arguments to the controller method', function() {
					router.navigate( 'test/bar/123', { 'trigger' : true } );
					controller.argMethod.should.have.been.calledWith('123');
				} );

			} );


			describe( 'Before Filter returns false', function() {
				beforeEach( function() {
					window.router_filter = false;
					controller.barMethod.reset();
				} );

				it( 'should return false', function() {
					router.navigate( 'test/bar', {'trigger' : true} );
					beforeSpy.returned(false);
				} )

				it( 'should not call the bar method', function() {
					router.navigate( 'test/bar', {'trigger' : true} );
					controller.barMethod.should.not.have.been.called;
				} )

				it( 'should not call the after method', function() {
					router.navigate( 'test/bar', {'trigger' : true} );
					afterSpy.should.not.have.been.called;
				} );
			} );


		} );




	} );

} );