define( function ( require ) {
	'use strict';

	require( 'slick' );

	var _                 = require( 'underscore' );
	var Marionette        = require( 'marionette' );
	var QuestionsItemView = require( 'videoPlayer/views/QuestionItemView' );
	var template          = require( 'text!videoPlayer/templates/questionsCompositeView.html' );

	return Marionette.CompositeView.extend( {

		'className' : 'right-bar',

		'template' : _.template( template ),

		'itemView' : QuestionsItemView,

		'itemViewContainer' : '#reflection-item-region',

		'ui' : {
			'headerTitle'  : '#reflection-title',
			'carousel'     : '#reflection-item-region',
			'pagination'   : '#reflection-paging',
			'currentPage'  : '#current-page',
			'lastPage'     : '#last-page',
			'submitButton' : '#submit-answers',
			'next'         : '.right-control',
			'prev'         : '.left-control'
		},

		'events' : {
			'click @ui.next'         : 'nextQuestion',
			'click @ui.prev'         : 'prevQuestion',
			'click @ui.submitButton' : 'submitAnswers'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			this.ui.carousel.slick( {
				'slidesToShow'   : 1,
				'slidesToScroll' : 1,
				'infinite'       : false,
				'arrows'         : false,
				'speed'          : 100,
				'draggable'      : false,
				'onAfterChange'  : this.afterChange.bind( this )
			} );

			this.showHeader();
			this.showPagination();
		},

		'showHeader' : function () {
			var type = {
				'1' : 'Reflection Questions',
				'2' : 'Follow-up Questions'
			};

			if ( this.collection.isEmpty() ) {
				this.ui.headerTitle.text( '' );
				return;
			}

			this.ui.headerTitle.text( type[ this.collection.first().get( 'QuestionTypeId' ) ] );
		},

		'showPagination' : function () {
			if ( this.collection.isEmpty() ) {
				this.ui.pagination.hide();
				return;
			}

			this.ui.currentPage.text( 1 );
			this.ui.lastPage.text( this.collection.length );
		},

		'showSubmitButton' : function ( page ) {
			if ( page === this.collection.length ) {
				this.ui.submitButton.show();
			} else {
				this.ui.submitButton.hide();
			}
		},

		'nextQuestion' : function () {
			this.ui.carousel.slickNext();
		},

		'prevQuestion' : function () {
			this.ui.carousel.slickPrev();
		},

		'updatePage' : function ( page ) {
			this.ui.currentPage.text( page );
		},

		'afterChange' : function( elem, page ) {
			this.updatePage( page + 1 );
			this.showSubmitButton( page + 1 );
		},

		'submitAnswers' : function() {

			// Filter out those models that don't have an answer
			var unanswered = this.collection.filter( function ( model ) {
				return model.get( 'AnswerText' ) === '' ||
					!model.get( 'AnswerText' );
			} );

			if ( unanswered.length !== 0 ) {
				return this.showUnanswered( unanswered );
			}

			this.saveAnswers();
		},

		'showUnanswered' : function ( unanswered ) {
			var first = _.first( unanswered );
			var page = this.collection.indexOf( first );
			var view = this.children.findByModel( first );

			this.ui.carousel.slickGoTo( page );
			view.ui.textInput.addClass( 'error' ).focus();
		},

		'saveAnswers' : function () {
			this.disableInputs();

			this.collection.sync( {
				'success' : this.removeContent.bind( this )
			} );
		},

		'disableInputs' : function () {
			this.children.each( function ( view ) {
				view.ui.textInput.attr( 'disabled', 'disabled' );
			} );

			this.ui.submitButton.attr( 'disabled', 'disabled' )
				.addClass( 'no-hover' );

			this.$el.find( '#reflection-items' )
				.addClass( 'disabled' );
		},

		'removeContent' : function () {
			this.$el.find( '.content' ).remove();
		}

	} );

} );
