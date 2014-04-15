define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var ProcessesItemView = require( 'apps/learningTargets/views/processes/ProcessesItemView' );
	var processesItemView;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};

	var initView = function () {
		processesItemView = new ProcessesItemView();
	};

	var destroyView = function () {
		processesItemView = undefined;
	};

	describe( 'ProcessesItemView ItemView', function () {

		before( function () {
			initView();
		} );

		after( function () {
			destroyView();
		} );

		it( 'should be an instance of ProcessesItemView', function () {
			processesItemView.should.be.an.instanceof( ProcessesItemView );
		} );

		it( 'does have a `template` property', function () {
			processesItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			processesItemView.should.have.property( 'tagName' );
			processesItemView.tagName.should.be.equal( 'li' );
		} );

		it( 'does have a `ui` property', function () {
			processesItemView.should.have.property( 'ui' );
		} );

		it( 'does have an `events` property', function () {
			processesItemView.should.have.property( 'events' );
		} );

		describe( '.toggleDrawer', function () {

			describe( 'when clicked', function () {

				var toggleDrawerSpy;

				before( function () {
					toggleDrawerSpy = sinon.spy( processesItemView, 'toggleDrawer' );
					processesItemView.toggleDrawer( dummyEvt );
				} );

				after( function () {
					processesItemView.toggleDrawer.restore();
				} );

				it( 'does call `.toggleDrawer`', function () {
					toggleDrawerSpy.should.have.been.callCount( 1 );
				} );

			} );

		} );

	} );

} );
