define( function ( require ) {
	'use strict';

	var QuestionModel = require( 'videoPlayer/models/QuestionModel' );

	describe( 'QuestionQuestionModel', function () {
		var reflection;
		var testData;

		before( function () {
			reflection = new QuestionModel();
			testData = {
				'QuestionId'   : 1,
				'QuestionText' : 'What visual or real-world examples have you effectively used in helping students understand geometry?'
			};
		} );

		it( 'should be an instance of QuestionModel', function () {
			reflection.should.be.an.instanceof( QuestionModel );
		} );

		it( 'should save data when calling .save', function () {
			reflection.set( testData );
			reflection.id.should.equal( testData.QuestionId );
			reflection.get( 'QuestionText' ).should.equal( testData.QuestionText );
		} );

		it( 'should initialize with given data', function () {
			testData = {
				'QuestionId'   : 2,
				'QuestionText' : 'What visual or real-world examples have you effectively used in helping students understand geometry?'
			};
			var newQuestion = new QuestionModel( testData );
			newQuestion.id.should.equal( testData.QuestionId );
			newQuestion.get( 'QuestionText' ).should.equal( testData.QuestionText );
		} );
	} );
} );
