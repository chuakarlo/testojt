define( function ( require )  {
	'use strict';

	var $                   = require( 'jquery' );
	var sinon               = window.sinon;
	var App                 = require( 'App' );
	var Remoting            = require( 'Remoting' );
	var QuestionsView       = require( 'videoPlayer/views/QuestionsCompositeView' );
	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );

	require( 'videoPlayer/entities/Questions');

	describe( 'QuestionsView', function () {

		var questionsView, stub;

		var testData = [ {
			'QuestionId'   : 1,
			'QuestionText' : '',
			'AnswerText'   : 'Test'
		},  {
			'QuestionId'   : 2,
			'QuestionText' : '',
			'AnswerText'   : ''
		} ];

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
			questionsView = new QuestionsView( {
				'collection' : new QuestionsCollection( testData )
			} );
			questionsView.render().onShow();
		} );

		after( function() {
			stub = null;
			App.reqres.removeHandler( 'pd360:available' );
		} );

		it( 'is an instance', function () {
			questionsView.should.be.an.instanceof( QuestionsView );
		} );

		it( 'property ui should have correct properties', function () {
			questionsView.should.have.property( 'ui' );
			questionsView.ui.should.have.property( 'header' );
			questionsView.ui.should.have.property( 'headerTitle' );
			questionsView.ui.should.have.property( 'carousel' );
			questionsView.ui.should.have.property( 'pagination' );
			questionsView.ui.should.have.property( 'currentPage' );
			questionsView.ui.should.have.property( 'lastPage' );
			questionsView.ui.should.have.property( 'submitButton' );
			questionsView.ui.should.have.property( 'next' );
			questionsView.ui.should.have.property( 'prev' );
		} );

		describe( '.submitAnswers', function () {

			before( function () {
				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
				questionsView.ui.carousel.slickGoTo = sinon.spy();
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'should not call Remoting.fetch if it has a question without an answer', function () {
				questionsView.submitAnswers();
				questionsView.ui.carousel.slickGoTo.should.have.callCount( 1 );
				questionsView.ui.carousel.slickGoTo.should.have.been.calledWith( 1 );
				Remoting.fetch.should.have.callCount( 0 );
			} );

			it( 'should call Remoting.fetch if all questions have answer', function () {
				var testData = [ {
					'QuestionId'   : 1,
					'QuestionText' : '',
					'AnswerText'   : 'Test'
				},  {
					'QuestionId'   : 2,
					'QuestionText' : '',
					'AnswerText'   : 'Test'
				} ];

				questionsView.collection.reset( testData );
				questionsView.submitAnswers();
				Remoting.fetch.should.have.callCount( 1 );
			} );

		} );

		describe( '.nextQuestion', function () {

			it( 'called when clicking ui.next', function () {
				questionsView.ui.carousel.slickNext = sinon.spy();
				questionsView.ui.carousel.slickCurrentSlide = sinon.stub().returns( 0 );
				questionsView.ui.carousel.slickNext.should.have.callCount( 0 );
				questionsView.ui.next.click();
				questionsView.ui.carousel.slickNext.should.have.callCount( 1 );
			} );

		} );

		describe( '.prevQuestion', function () {

			it( 'called when clicking ui.prev', function () {
				questionsView.ui.carousel.slickPrev = sinon.spy();
				questionsView.ui.carousel.slickCurrentSlide = sinon.stub().returns( 1 );
				questionsView.ui.carousel.slickPrev.should.have.callCount( 0 );
				questionsView.ui.prev.click();
				questionsView.ui.carousel.slickPrev.should.have.callCount( 1 );
			} );

		} );

	} );

} );


