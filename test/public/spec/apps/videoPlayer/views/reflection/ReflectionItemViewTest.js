define( function ( require ) {
	'use strict';

	var Backbone           = require( 'backbone' );

	var ReflectionItemView = require( 'videoPlayer/views/reflection/ReflectionItemView' );

	describe( 'ReflectionItemView', function () {
		var reflectionItemView = new ReflectionItemView( {
			'model' : new Backbone.Model( {
				'QuestionId'   : 1,
				'QuestionText' : 'Who am I?',
				'AnswerText'   : ''
			} )
		} );

		before( function () {
			reflectionItemView.render();
		} );

		it( 'should have rendered template', function () {
			reflectionItemView.$el.length.should.equal( 1 );
		} );

		describe( '.onKeyUp', function () {

			it( 'should change AnswerText attribute', function () {
				reflectionItemView.ui.textInput.val( 'Hello World' );
				reflectionItemView.onKeyUp();
				reflectionItemView.model.get( 'AnswerText' ).should.equal( 'Hello World' );
			} );

		} );

		describe( 'XSS protection on textInput', function () {

			it( 'should properly escape script tags as input', function () {
				reflectionItemView.ui.textInput.val( '<script></script>' );
				reflectionItemView.onKeyUp();
				reflectionItemView.model.get( 'AnswerText' ).should.equal( '&lt;script&gt;&lt;\\/script&gt;' );
			} );

			it( 'should properly escape html tags', function () {
				reflectionItemView.ui.textInput.val( '<p></p>' );
				reflectionItemView.onKeyUp();
				reflectionItemView.model.get( 'AnswerText' ).should.equal( '&lt;p&gt;&lt;/p&gt;' );
			} );

		} );

		describe( 'XSS protection on textInput', function () {

			it( 'should properly escape script tags as input', function () {
				reflectionItemView.ui.textInput.val( '<script></script>' );
				reflectionItemView.onKeyUp();
				reflectionItemView.model.get( 'AnswerText' ).should.equal( '&lt;script&gt;&lt;\\/script&gt;' );
			} );

			it( 'should properly escape html tags', function() {
				reflectionItemView.ui.textInput.val( '<p></p>' );
				reflectionItemView.onKeyUp();
				reflectionItemView.model.get( 'AnswerText' ).should.equal( '&lt;p&gt;&lt;/p&gt;' );
			} );

		} );

	} );

} );
