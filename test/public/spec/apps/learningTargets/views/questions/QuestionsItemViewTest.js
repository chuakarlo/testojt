define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var QuestionsItemView = require( 'apps/learningTargets/views/questions/QuestionsItemView' );
	var questionsItemView;

	var dummyEvt = {
		'type'           : 'click',
		'preventDefault' : function () {}
	};

	var initView = function () {
		questionsItemView = new QuestionsItemView();
	};

	var destroyView = function () {
		questionsItemView = undefined;
	};

	describe( 'QuestionsItemView ItemView', function () {

		before( function () {
			initView();
		} );

		after( function () {
			destroyView();
		} );

		it( 'should be an instance of QuestionsItemView', function () {
			questionsItemView.should.be.an.instanceof( QuestionsItemView );
		} );

		it( 'does have a `template` property', function () {
			questionsItemView.should.have.property( 'template' );
		} );

		it( 'does have a `tagName` property', function () {
			questionsItemView.should.have.property( 'tagName' );
			questionsItemView.tagName.should.be.equal( 'li' );
		} );

		it( 'does have a `ui` property', function () {
			questionsItemView.should.have.property( 'ui' );
		} );

		it( 'does have an `events` property', function () {
			questionsItemView.should.have.property( 'events' );
		} );

		describe( '.toggleDrawer', function () {

			describe( 'when clicked', function () {

				var toggleDrawerSpy;

				before( function () {
					toggleDrawerSpy = sinon.spy( questionsItemView, 'toggleDrawer' );
					questionsItemView.toggleDrawer( dummyEvt );
				} );

				after( function () {
					questionsItemView.toggleDrawer.restore();
				} );

				it( 'does call `.toggleDrawer`', function () {
					toggleDrawerSpy.should.have.been.callCount( 1 );
				} );

			} );

		} );

	} );

} );
