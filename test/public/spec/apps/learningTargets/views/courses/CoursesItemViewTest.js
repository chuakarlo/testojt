define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var CoursesItemView = require( 'apps/learningTargets/views/courses/CoursesItemView' );
	var coursesItemView;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};

	var initView = function () {
		coursesItemView = new CoursesItemView();
	};

	var destroyView = function () {
		coursesItemView = undefined;
	};

	describe( 'CoursesItemView ItemView', function () {

		before( function () {
			initView();
		} );

		after( function () {
			destroyView();
		} );

		it( 'should be an instance of CoursesItemView', function () {
			coursesItemView.should.be.an.instanceof( CoursesItemView );
		} );

		it( 'does have a `template` property', function () {
			coursesItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			coursesItemView.should.have.property( 'tagName' );
			coursesItemView.tagName.should.be.equal( 'li' );
		} );

		it( 'does have a `ui` property', function () {
			coursesItemView.should.have.property( 'ui' );
		} );

		it( 'does have an `events` property', function () {
			coursesItemView.should.have.property( 'events' );
		} );

		describe( '.toggleDrawer', function () {

			describe( 'when clicked', function () {

				var toggleDrawerSpy;

				before( function () {
					toggleDrawerSpy = sinon.spy( coursesItemView, 'toggleDrawer' );

					coursesItemView.toggleDrawer( dummyEvt );
				} );

				after( function () {
					coursesItemView.toggleDrawer.restore();
				} );

				it( 'does call `.toggleDrawer`', function () {
					toggleDrawerSpy.should.have.been.callCount( 1 );
				} );

			} );

		} );

	} );

} );
