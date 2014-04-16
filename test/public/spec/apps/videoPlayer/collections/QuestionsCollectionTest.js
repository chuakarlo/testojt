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
				'QuestionText'   : 'What visual or real-world examples have you effectively used in helping students understand geometry?',
				'QuestionTypeId' : 1
			}, {
				'QuestionId'     : 2,
				'QuestionText'   : 'What visual or real-world examples have you effectively used in helping students understand geometry?',
				'QuestionTypeId' : 2
			}, {
				'QuestionId'     : 3,
				'QuestionText'   : 'What visual or real-world examples have you effectively used in helping students understand geometry?',
				'QuestionTypeId' : 1
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
				var item     = requests[ 0 ];

				item.should.have.property( 'objectPath' );
				item.should.have.property( 'method' );
				item.should.have.property( 'path' );
				item.should.have.property( 'args' );
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
