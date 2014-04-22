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

		describe( 'buildRequests method', function () {

			it( 'should return an array of objects', function () {
				var requests = questions.buildRequests();

				requests.should.be.an.instanceof( Array );
			} );

			it( 'objects inside the array should have the correct properties', function () {
				var requests = questions.buildRequests();
				var request  = requests[ 0 ];

				request.should.have.property( 'objectPath' );
				request.should.have.property( 'method' );
				request.should.have.property( 'path' );
				request.should.have.property( 'args' );
			} );

			it( 'should have correct path and objectPath based on ContentTypeId', function () {
				// Common core questions
				questions.reset( [ {
					'QuestionId'     : 1,
					'QuestionText'   : 'Test question',
					'QuestionTypeId' : 1,
					'ContentTypeId'  : 6 // Common core type id
				} ] );

				var requests = questions.buildRequests();
				var request  = requests[ 0 ];

				request.path.should.equal( 'com.schoolimprovement.pd360.dao.commoncore.CCQuestionAnswersGateway' );
				request.objectPath.should.equal( 'com.schoolimprovement.pd360.dao.commoncore.CCQuestionAnswers' );

			} );

		} );

		describe( 'sync method', function () {

			var stub;

			before( function () {
				stub = sinon.stub().returns( false );
				App.reqres.setHandler( 'pd360:available', stub );
			} );

			after( function() {
				stub = null;
				App.reqres.removeHandler( 'pd360:available' );
				Remoting.fetch.restore();
			} );

			it( 'should call ajax on save', function () {
				sinon.stub( Remoting, 'fetch' );

				Remoting.fetch.should.have.callCount( 0 );
				questions.sync();
				Remoting.fetch.should.have.callCount( 1 );
			} );

		} );

	} );

} );
