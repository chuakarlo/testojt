define( function ( require ) {
	'use strict';

	var sinon               = window.sinon;

	var App                 = require( 'App' );
	var Remoting            = require( 'Remoting' );
	var QuestionsCollection = require( 'videoPlayer/collections/QuestionsCollection' );

	describe( 'QuestionsCollection', function () {
		var questions;
		var testData;

		before( function () {
			testData = [ {
				'QuestionId'     : 1,
				'QuestionText'   : 'Test question',
				'QuestionTypeId' : 1,
				'ContentTypeId'  : 3
			} ];

			questions = new QuestionsCollection();
			questions.reset( testData );
		} );

		it( 'should be an instance of QuestionsCollection', function () {
			questions.should.be.an.instanceof( QuestionsCollection );
		} );

		it( 'should have length equal to number of test data', function () {
			questions.length.should.equal( testData.length );
		} );

	} );

} );
