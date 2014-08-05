define( function ( require ) {
	'use strict';

	require( 'videoPlayer/plugins/putCursorAtEnd' );

	var _ = require( 'underscore' );

	var App               = require( 'App' );
	var QuestionsItemView = require( 'videoPlayer/views/question/QuestionItemView' );
	var template          = require( 'text!videoPlayer/templates/questionsCompositeView.html' );

	return App.Common.CarouselView.extend( {

		'className' : 'col-xs-12 col-sm-12 right-bar',

		'template' : _.template( template ),

		'itemView' : QuestionsItemView,

		'itemViewOptions' : function () {
			return {
				'textLock' : !this.collection.showFollowup()
			};
		},

		'emptyView' : App.Common.CarouselEmptyView,

		'itemViewContainer' : '#questions-item-region',

		'ui' : {
			'header'       : '#questions-header',
			'headerTitle'  : '#questions-header h3',
			'carouselCont' : '#questions-items',
			'carousel'     : '#questions-item-region',
			'pagination'   : '#questions-pagination',
			'currentPage'  : '#current-page',
			'lastPage'     : '#last-page',
			'next'         : '.right-control',
			'prev'         : '.left-control'
		},

		'events' : {
			'click @ui.next' : 'nextQuestion',
			'click @ui.prev' : 'prevQuestion'
		},

		'carouselOptions' : {
			'nav'         : false,
			'autoWidth'   : false,
			'itemsToShow' : 1,
			'mouseDrag'   : false,
			'controls'    : {
				'next' : '.right-control',
				'prev' : '.left-control'
			}
		},

		'getCarouselEl' : function () {
			return this.ui.carousel;
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onShow' : function () {
			this.showCarousel();
			this.showPagination();
		},

		'showCarousel' : function () {
			this.trigger( 'show:carousel' );
		},

		'nextQuestion' : function () {
			this.next();
		},

		'prevQuestion' : function () {
			this.prev();
		},

		'afterCarouselMoved' : function ( data ) {
			this.updatePagination( data.item.index + 1 );
			this.updateHeader( data.item.index );
			this.showHideArrow( data.item.index + 1 );
			this.children.findByIndex( data.item.index )
				.ui.textInput.putCursorAtEnd();
		},

		// destroy navigation plugin for it's not used
		'afterCarouselInitialized' : function ( data ) {
			var navigation = data.relatedTarget._plugins.navigation;
			navigation.destroy();
		},

		'updatePagination' : function ( page ) {
			this.ui.currentPage.text( page );
		},

		'updateHeader' : function ( index ) {
			var header = {
				'1' : 'Reflection Questions',
				'2' : 'Follow-up Questions'
			};
			var model = this.collection.at( index );
			this.ui.headerTitle.text( header[ model.get( 'QuestionTypeId' ) ] );
		},

		'showPagination' : function () {
			if ( this.collection.length ) {
				this.ui.currentPage.text( 1 );
				this.ui.lastPage.text( this.collection.length );
				this.ui.prev.hide();
			} else {
				this.$el.addClass( 'empty-questions' );
				this.ui.pagination.hide();
			}
		},

		'showHideArrow' : function ( page ) {
			var pages = this.collection.length;
			if ( page < 2 ) {
				this.ui.prev.hide();
				this.ui.next.show();
			} else if ( page === pages ) {
				this.ui.next.hide();
				this.ui.prev.show();
			} else {
				this.ui.prev.show();
				this.ui.next.show();
			}
		}

	} );

} );
