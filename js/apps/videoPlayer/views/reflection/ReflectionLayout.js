define( function ( require ) {
	'use strict';

	require( 'jquery' );
	require( 'jquery.mousewheel' );
	require( 'moment-timezone' );
	require( 'timezone' );

	var moment     = require( 'moment' );

	var Marionette = require( 'marionette' );
	var _          = require( 'underscore' );
	var Session    = require( 'Session' );

	var template = require( 'text!videoPlayer/templates/reflection/reflectionLayout.html' );
	var ItemView = require( 'videoPlayer/views/reflection/ReflectionItemView' );

	// Time constants for switching between reflection and followup questions
	var defaults = {
		'timeToShowFollowup' : 3,
		'timeDuration'       : 'seconds',
		'timezone'           : 'MST7MDT'
	};

	return Marionette.Layout.extend( {

		'className' : 'right-bar',

		'template' : _.template( template ),

		'ui' : {
			'submitAnswers' : '#submit-answers',
			'paginateLeft'  : '.left-control',
			'paginateRight' : '.right-control',
			'paging'        : '#reflection-paging',
			'header'        : '#reflection-title'
		},

		'events' : {
			'click @ui.submitAnswers' : 'submitAnswers',
			'click @ui.paginateRight' : 'paginateRight',
			'click @ui.paginateLeft'  : 'paginateLeft'
		},

		'regions': {
			'reflectionItemRegion': '#reflection-item-region'
		},

		'initialize' : function ( options ) {
			// Initialize mousewheel when a view is shown on reflectionItemRegion
			this.listenTo( this.reflectionItemRegion, 'show', this.initializeMouseWheel );

			// Show question view on collection's sync and reset events
			this.listenTo( this.collection, 'sync reset', this.initialView );

			// Submit events
			this.listenTo( this, 'submit:success', this.handleSubmitSuccess );
			this.listenTo( this, 'submit:error', this.handleSubmitError );

			// page:change event actions
			this.listenTo( this, 'page:change', this.showPage );
			this.listenTo( this, 'page:change', this.updatePaging );
			this.listenTo( this, 'page:change', this.toggleSubmitButton );

			this.bindUIElements();

			// Pagination counter, mimics array indexing ( starts with 0 )
			this.currentPage = 0;

			return this;
		},

		'onShow' : function () {
			this.initialView();
			// Start fetching questions from server
			this.fetchQuestions();
		},

		'initialView' : function () {
			if ( this.collection && this.collection.length ) {
				this.showPage( this.currentPage );
				this.updatePaging( this.currentPage );

				// show paginations buttons if
				// collection has data
				this.ui.paginateRight.show();
				this.ui.paginateLeft.show();
			} else {
				this.ui.paginateRight.hide();
				this.ui.paginateLeft.hide();
			}

			this.toggleSubmitButton( this.currentPage );
		},

		'showPage' : function ( index ) {
			var view = new ItemView( {
				'model' : this.collection.models[ index  ]
			} );
			this.reflectionItemRegion.show( view );
		},

		'toggleSubmitButton' : function ( index ) {
			if ( this.collection && ( index === this.collection.length - 1 ) ) {
				// Show submit button if user has reached
				// the last question
				this.ui.submitAnswers.show();
			} else {
				// Hide submit button if:
				// - We did not reach the last question
				// - ReflectionQuestionsCollection is empty or data not yet arrived
				this.ui.submitAnswers.hide();
			}
		},

		'updatePaging' : function ( index ) {
			var string = ( index + 1 ) + '/' + this.collection.length;
			this.ui.paging.html( string );
		},

		'paginateLeft' : function ( event ) {
			if ( this.currentPage !== 0 ) {
				this.currentPage--;
			}
			this.trigger( 'page:change', this.currentPage );
			return false;
		},

		'paginateRight' : function ( event ) {
			if ( this.currentPage !== this.collection.length - 1 ) {
				this.currentPage++;
			}
			this.trigger( 'page:change', this.currentPage );
			return false;
		},

		'initializeMouseWheel' : function () {

			// Cross browser support for mousewheel
			// Stop scrolling parent when child scroll reaches bottom or top
			// http://jsbin.com/itajok/1/edit
			var elem       = this.$el.find( '#reflection-items' );
			var elemHeight = elem.height();

			// -d scrollbar going down, +d scrollbar going up
			elem.bind( 'mousewheel', function ( e, d ) {
				var scrollHeight = elem.get( 0 ).scrollHeight;
				if ( ( this.scrollTop === ( scrollHeight - elemHeight ) && d < 0 ) ||
					( this.scrollTop === 0 && d > 0 ) ) {
					e.preventDefault();
				}
			} );
		},

		'submitAnswers' : function () {

			// Array of unanswered questions
			var unanswered = [];

			this.$el.find( '.reflection-item textarea.error' )
				.removeClass( 'error' );

			// Return ItemViews of those questions that don't have an answer
			unanswered = this.collection.filter( function ( model ) {
				return model.get( 'AnswerText' ).trim() === '' || !model.get( 'AnswerText' );
			} );

			// Oh! perfect, you've answered all questions
			if ( unanswered.length === 0 ) {
				this.trigger( 'submit:success' );
			} else {
				// Maybe you forget to answer some questions
				this.trigger( 'submit:error', unanswered );
			}
		},

		'handleSubmitError' : function ( unanswered ) {

			// Get first view with no answer
			// highlighting textarea and move scroll to that question
			var index = this.collection.indexOf( _.first( unanswered ) );
			this.trigger( 'page:change', index );

			// update currentpage
			this.currentPage = index;

			// highlight textarea and put focus
			this.reflectionItemRegion.currentView.
				ui.textInput.addClass( 'error' ).focus();

		},

		'fetchQuestions' : function () {

			var requests = {
				'args' : {
					'persId'    : Session.personnelId(), // should be from Session
					'contentId' : 613		 // video content id
				}
			};

			this.collection.fetch( requests, {
				'success' : _.bind( this.showQuestions, this, defaults )
			} );
		},

		'showQuestions' : function( options, response ) {

			var type = 1; // Show reflection questions as default
			var typeFollowup = 2;

			var questions = _.first( response );

			// Modified time, format to normalize date
			var modified  = moment( _.findWhere( questions, { 'QuestionTypeId' : type } ).Modified )
								.format( 'MMMM, D YYYY h:mm:ss' );

			// Current time on MST7MDT timezone, format to normalize date when diff'd to `modified`
			var now = moment().tz( options.timezone ).format( 'MMMM, D YYYY h:mm:ss' );

			// Time difference in options.timeDuration (minutes, hours, days)
			var difference = moment( now ).diff( modified, options.timeDuration );

			if ( difference >= options.timeToShowFollowup ) {
				type = typeFollowup;
				this.ui.header.text( 'Follow-up Questions' );
			} else {
				this.ui.header.text( 'Reflection Questions' );
			}

			// Filter those questions with type `type`
			var thisTypes = _.filter( questions, function( question ) {
				return question.QuestionTypeId === type;
			} );

			this.collection.reset( thisTypes );
		},

		'handleSubmitSuccess' : function () {

			var self = this;

			function disableTextInput() {
				self.reflectionItemRegion.currentView
					.ui.textInput.attr('disabled', 'disabled');
			}

			// Disable textareas
			disableTextInput();
			// If user submits the reflection answers and still
			// paginates to other questions, listen on each
			// reflectionItemRegion 'show' event and also
			// disable it's text area.
			this.listenTo( this.reflectionItemRegion, 'show', disableTextInput );

			// Disable submit button
			this.ui.submitAnswers.attr( 'disabled', 'disabled' )
				.addClass('no-hover');

			// Ajax post request to server
			this.collection.sync( {
				'success' : _.bind( this.removeQuestions, this )
			} );
		},

		'removeQuestions' : function() {
			this.$el.find('.content').remove();
		}
	} );
} );
