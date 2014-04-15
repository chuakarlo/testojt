define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var ObservationsItemView = require( 'apps/learningTargets/views/observations/ObservationsItemView' );
	var observationsItemView;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};

	var initView = function () {
		observationsItemView = new ObservationsItemView();
	};

	var destroyView = function () {
		observationsItemView = undefined;
	};

	describe( 'ObservationsItemView ItemView', function () {

		before( function () {
			initView();
		} );

		after( function () {
			destroyView();
		} );

		it( 'should be an instance of ObservationsItemView', function () {
			observationsItemView.should.be.an.instanceof( ObservationsItemView );
		} );

		it( 'does have a `template` property', function () {
			observationsItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			observationsItemView.should.have.property( 'tagName' );
			observationsItemView.tagName.should.be.equal( 'li' );
		} );

		it( 'does have a `ui` property', function () {
			observationsItemView.should.have.property( 'ui' );
		} );

		it( 'does have an `events` property', function () {
			observationsItemView.should.have.property( 'events' );
		} );

		describe( '.toggleDrawer', function () {

			describe( 'when clicked', function () {

				var toggleDrawerSpy;

				before( function () {
					toggleDrawerSpy = sinon.spy( observationsItemView, 'toggleDrawer' );
					observationsItemView.toggleDrawer( dummyEvt );
				} );

				after( function () {
					observationsItemView.toggleDrawer.restore();
				} );

				it( 'does call `.toggleDrawer`', function () {
					toggleDrawerSpy.should.have.been.callCount( 1 );
				} );

			} );

		} );

	} );

} );
