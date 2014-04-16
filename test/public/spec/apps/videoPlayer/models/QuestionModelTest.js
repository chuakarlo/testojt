define( function ( require ) {
	'use strict';

	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	describe( 'QuestionModel', function () {
		var question;
		var testData;

		before( function () {
			testData = {
				'QuestionId'   : 1,
				'QuestionText' : 'Test question',
				'AnswerText'   : ''
			};
			question = new QuestionModel( testData );
		} );

		it( 'is an instance', function () {
			question.should.be.an.instanceof( QuestionModel );
		} );

		it( 'should initialize with given data', function () {
			question.id.should.equal( testData.QuestionId );
			question.get( 'QuestionText' ).should.equal( testData.QuestionText );
		} );

		describe( '.getSanitizedAnswer', function () {

			it( 'should protect from script tag inputs', function () {
				question.set( 'AnswerText', '<script></script>' );
				question.getSanitizedAnswer().should.equal( '&lt;script&gt;&lt;\\/script&gt;' );
			} );

			it( 'should escape html tags', function () {
				question.set( 'AnswerText', '<p></p>' );
				question.getSanitizedAnswer().should.equal( '&lt;p&gt;&lt;/p&gt;' );
			} );

		} );

	} );

} );
