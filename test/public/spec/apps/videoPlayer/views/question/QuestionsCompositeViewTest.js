define( function ( require )  {
	'use strict';

	var sinon               = window.sinon;
	var App                 = require( 'App' );
	var QuestionsView       = require( 'videoPlayer/views/question/QuestionsCompositeView' );
	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );

	describe( 'QuestionsView', function () {

		var questionsView;
		var stub;

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

		after( function () {
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
			questionsView.ui.should.have.property( 'next' );
			questionsView.ui.should.have.property( 'prev' );
		} );

		describe( '.nextQuestion', function () {

			it( 'called when clicking ui.next', function () {
				questionsView.next = sinon.spy();
				questionsView.next.should.have.callCount( 0 );
				questionsView.ui.next.click();
				questionsView.next.should.have.callCount( 1 );
			} );

		} );

		describe( '.prevQuestion', function () {

			it( 'called when clicking ui.prev', function () {
				questionsView.prev = sinon.spy();
				questionsView.prev.should.have.callCount( 0 );
				questionsView.ui.prev.click();
				questionsView.prev.should.have.callCount( 1 );
			} );

		} );

	} );

} );
