define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var PortfoliosItemView = require( 'apps/learningTargets/views/portfolios/PortfoliosItemView' );
	var portfoliosItemView;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};

	var initView = function () {
		portfoliosItemView = new PortfoliosItemView();
	};

	var destroyView = function () {
		portfoliosItemView = undefined;
	};

	describe( 'PortfoliosItemView ItemView', function () {

		before( function () {
			initView();
		} );

		after( function () {
			destroyView();
		} );

		it( 'should be an instance of PortfoliosItemView', function () {
			portfoliosItemView.should.be.an.instanceof( PortfoliosItemView );
		} );

		it( 'does have a `template` property', function () {
			portfoliosItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			portfoliosItemView.should.have.property( 'tagName' );
			portfoliosItemView.tagName.should.be.equal( 'li' );
		} );

		it( 'does have a `ui` property', function () {
			portfoliosItemView.should.have.property( 'ui' );
		} );

		it( 'does have an `events` property', function () {
			portfoliosItemView.should.have.property( 'events' );
		} );

		describe( '.toggleDrawer', function () {

			describe( 'when clicked', function () {

				var toggleDrawerSpy;

				before( function () {
					toggleDrawerSpy = sinon.spy( portfoliosItemView, 'toggleDrawer' );
					portfoliosItemView.toggleDrawer( dummyEvt );
				} );

				after( function () {
					portfoliosItemView.toggleDrawer.restore();
				} );

				it( 'does call `.toggleDrawer`', function () {
					toggleDrawerSpy.should.have.been.callCount( 1 );
				} );

			} );

		} );

	} );

} );
