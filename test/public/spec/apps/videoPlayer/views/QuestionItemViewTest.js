define( function ( require ) {
	'use strict';

	var QuestionItemView = require( 'videoPlayer/views/QuestionItemView' );
	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );
	
	describe( 'QuestionsItemView', function () {
		
		var question = new QuestionItemView( {
			'model' : new QuestionModel( {
				'QuestionId' : 1,
				'QuestionText' : 'Test question?',
				'AnswerText' : ''
			} )
		} );

		before( function () {
			question.render();
		} );

		describe( '.onKeyUp', function () {
			
			it( 'should save answer', function () {
				question.ui.textInput.val( 'Test answer' );
				question.onKeyUp();
				question.model.get( 'AnswerText' ).should.equal( 'Test answer' );
			} );

		} );

	} );
	
} );
