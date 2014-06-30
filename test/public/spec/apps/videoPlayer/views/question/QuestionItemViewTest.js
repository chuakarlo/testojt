define( function ( require ) {
	'use strict';

	var sinon = window.sinon;

	var QuestionItemView = require( 'videoPlayer/views/question/QuestionItemView' );
	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	describe( 'QuestionsItemView', function () {

		var question;

		before( function () {
			question = new QuestionItemView( {
				'model' : new QuestionModel( {
					'QuestionId'   : 1,
					'QuestionText' : 'Test question?',
					'AnswerText'   : '',
					'save'         : sinon.spy()
				} )
			} );
			question.render();
		} );

		describe( '.saveModel', function () {

			it( 'should call .save method', function () {
				question.ui.textInput.val( 'Test answer' );
				question.saveModel();
				question.model.save.should.have.callCount( 1 );
			} );

		} );

	} );

} );
