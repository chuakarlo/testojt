define( function ( require ) {
	'use strict';

	require( 'marionette' );
	require( 'moment-timezone' );

	var moment   = require( 'moment' );
	var Backbone = require( 'backbone' );
	var sinon    = window.sinon;
	var App      = require( 'App' );

	var ReflectionLayout = require( 'videoPlayer/views/reflection/ReflectionLayout' );

	describe( 'ReflectionLayout', function () {
		var stub;

		before( function () {
			stub = sinon.stub().returns( false );
			App.reqres.setHandler( 'pd360:available', stub );
		} );

		after( function() {
			stub = null;
			App.reqres.removeHandler( 'pd360:available' );
		} );

		describe( '.initialView', function () {
			var reflection;

			before( function () {
				reflection = new ReflectionLayout( {
					collection : new Backbone.Collection()
				} );
				reflection.render();
			} );

			it( 'should have an item shown on initial view', function () {
				var dummy = [ {
					'QuestionId'   : 1,
					'QuestionText' : 'test question',
					'AnswerText'   : ''
				} ];
				reflection.collection.reset( dummy );
				reflection.initialView();
				reflection.$el.find( '.reflection-item' ).should.have.length( 1 );
			} );
		} );

		describe( 'Pagination', function () {
			var reflection;

			before( function () {
				reflection = new ReflectionLayout( {
					collection : new Backbone.Collection()
				} );
				reflection.render();
				reflection.collection.reset( [ {
					'QuestionId': 1,
					'QuestionText': 'Test 1',
					'AnswerText': ''
				}, {
					'QuestionId': 2,
					'QuestionText': 'Test 2',
					'AnswerText': ''
				}, {
					'QuestionId': 3,
					'QuestionText': 'Test 3',
					'AnswerText': ''
					} ] );
			} );

			describe( '.paginateLeft', function () {

				afterEach( function () {
					reflection.off( 'page:change' );
				} );

				after( function () {
					reflection.currentPage = 0;
				} );

				it( 'should not change currentPage if it\'s equal to 0', function ( done ) {
					reflection.on( 'page:change', function () {
						reflection.currentPage.should.equal( 0 );
						done();
					} );
					reflection.paginateLeft();
				} );

				it( 'should trigger page:change event and with currentPage in correct position', function ( done ) {
					reflection.currentPage = 2;
					reflection.on( 'page:change', function () {
						reflection.currentPage.should.equal( 1 );
						done();
					} );
					reflection.paginateLeft();
				} );

				it( 'should respond when clicking .paginateLeft ui', function ( done ) {
					reflection.currentPage = 1;
					reflection.on( 'page:change', reflection.updatePaging );
					reflection.on( 'page:change', function () {
						reflection.currentPage.should.equal( 0 );
						done();
					} );
					reflection.ui.paginateLeft.click();
				} );

				it( 'should trigger a change in paging ui with correct html' , function ( done ) {
					reflection.currentPage = 2;
					reflection.on( 'page:change', reflection.updatePaging );
					reflection.on( 'page:change', function () {
						reflection.ui.paging.html().should.equal( '2/3' );
						done();
					});
					reflection.ui.paginateLeft.click();
				});
			} );

			describe( '.paginateRight', function () {

				afterEach( function () {
					reflection.off( 'page:change' );
				} );

				after( function () {
					reflection.currentPage = 0;
				} );

				it( 'should trigger page:change event and currentPage should equal 1', function ( done ) {
					reflection.on( 'page:change', function () {
						reflection.currentPage.should.equal( 1 );
						done();
					} );
					reflection.paginateRight();
				} );

				it( 'should not change currentPage if it\'s equal to last', function ( done ) {
					reflection.currentPage = 2;
					reflection.on( 'page:change', function () {
						reflection.currentPage.should.equal( 2 );
						done();
					} );
					reflection.paginateRight();
				} );

				it( 'should respond when clicking .paginateRight ui', function ( done ) {
					reflection.currentPage = 0;
					reflection.on( 'page:change', function () {
						reflection.currentPage.should.equal( 1 );
						done();
					});
					reflection.ui.paginateRight.click();
				} );

				it( 'should trigger a change on paging ui with correct html', function ( done ) {
					reflection.currentPage = 0;
					reflection.on( 'page:change', reflection.updatePaging );
					reflection.on( 'page:change', function () {
						reflection.ui.paging.html().should.equal( '2/3' );
						done();
					});
					reflection.ui.paginateRight.click();
				});
			} );
		} );

		describe( '.showQuestions', function () {

			var reflection;

			before( function () {
				reflection = new ReflectionLayout( {
					'collection' : new Backbone.Collection(),
				} );
				reflection.render();
			} );

			it( 'should show followup questions after a specified time', function ( done ) {
				var options = {
					'timezone'           : 'MST7MDT',
					'timeDuration'       : 'seconds',
					'timeToShowFollowup' : 1
				};

				var modified = moment().tz( options.timezone ).format( 'MMMM, D YYYY h:mm:ss' );

				var testData = [ {
					'QuestionId'     : 1,
					'QuestionTypeId' : 1,
					'QuestionText'   : '',
					'AnswerText'     : '',
					'Modified'       : modified
				}, {
					'QuestionId'     : 2,
					'QuestionTypeId' : 2,
					'QuestionText'   : '',
					'AnswerText'     : '',
					'Modified'       : modified
				} ];

				// simulate passing of time, should be less than mocha timeout (2 seconds)
				setTimeout( function () {
					reflection.showQuestions( options, [ testData ] );
					reflection.collection.should.have.length( 1 );

					var itemShown = reflection.collection.first();
					itemShown.get( 'QuestionTypeId' ).should.equal( 2 );
					done();
				}, 1000 );

			} );
		} );

		describe( '.submitAnswers', function () {
			var reflection;

			before( function () {

				var Collection = Backbone.Collection.extend( {
					'sync' : sinon.spy()
				} );

				reflection = new ReflectionLayout( {
					'collection' : new Collection()
				} );

				reflection.render();
			} );

			it( 'should emit submit:success event if all questions have answers', function ( done ) {
				var testData = {
					'QuestionId'   : 1,
					'QuestionText' : 'Much fun?',
					'AnswerText'   : 'Flappy Bird'
				};

				reflection.collection.reset( testData );
				reflection.on( 'submit:success', function () {
					done();
					reflection.ui.submitAnswers.attr( 'disabled', false );
				} );
				reflection.ui.submitAnswers.trigger( 'click' );
			} );

			it( 'should emit submit:error event if a question have no answer', function ( done ) {
				var testData = {
					'QuestionId'   : 1,
					'QuestionText' : 'So error!',
					'AnswerText'   : ''
				};

				reflection.collection.reset( testData );
				reflection.on( 'submit:error', function () {
					done();
				} );
				reflection.ui.submitAnswers.trigger( 'click' );
			} );

			describe( 'Submit handlers', function () {
				var spiedReflection;

				before( function () {
					var SpiedReflection = ReflectionLayout.extend( {
						'handleSubmitSuccess' : sinon.spy(),
						'handleSubmitError' : sinon.spy()
					} );

					spiedReflection = new SpiedReflection( {
						'collection' : new Backbone.Collection()
					} );

					spiedReflection.render();
				} );

				it( 'should call .handleSubmitSuccess once', function ( done ) {

					var testData = {
						'QuestionId'   : 1,
						'QuestionText' : 'Much fun?',
						'AnswerText'   : 'Flappy Bird'
					};

					spiedReflection.collection.reset( testData );

					spiedReflection.on( 'submit:success', function () {
						spiedReflection.handleSubmitSuccess.should.have.callCount( 1 );
						done();
					} );

					spiedReflection.ui.submitAnswers.trigger( 'click' );
				} );

				it( 'should call .handleSubmitError with the correct args', function ( done ) {
					var testData = {
						'QuestionId'   : 1,
						'QuestionText' : 'So error?',
						'AnswerText'   : ''
					};

					spiedReflection.collection.reset( testData );

					spiedReflection.on( 'submit:error', function () {
						spiedReflection.handleSubmitError.should.have.been.calledWith( spiedReflection.collection.models );
						done();
					} );

					spiedReflection.ui.submitAnswers.trigger( 'click' );
				} );

			} );

		} );

	} );

} );
