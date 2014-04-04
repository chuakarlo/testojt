define( function ( require ) {
	'use strict';

	var $         = require( 'jquery' );
	var sinon     = window.sinon;

	var Remoting = require( 'Remoting' );
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

		describe( 'fetch method', function () {

			before( function () {
				this.success = sinon.spy();
				this.error = sinon.spy();

				sinon.stub( Remoting, 'fetch' ).returns( $.Deferred() );
			} );

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'should call success callback once on success', function () {
				Remoting.fetch.should.have.callCount( 0 );

				var request = {
					'args' : {}
				};

				questions.fetch( request, {
					'success' : this.success,
					'error'   : this.error
				} ).resolve();

				Remoting.fetch.should.have.callCount( 1 );
				this.success.should.have.callCount( 1 );
				this.error.should.have.callCount( 0 );
			} );

		} );

		describe( 'resetCollection method', function () {
			it( 'should reset collection and contain the correct length', function() {
				questions.resetCollection( [ testData ] );
				questions.length.should.equal( 3 );
			} );
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

			after( function () {
				Remoting.fetch.restore();
			} );

			it( 'should call ajax on sync', function () {
				sinon.stub( Remoting, 'fetch' );

				Remoting.fetch.should.have.callCount( 0 );
				questions.sync();
				Remoting.fetch.should.have.callCount( 1 );
			} );
		} );

	} );
} );
