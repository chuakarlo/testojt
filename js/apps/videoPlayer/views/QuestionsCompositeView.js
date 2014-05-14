define( function ( require ) {
	'use strict';

	require( 'slick' );

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var QuestionsItemView = require( 'videoPlayer/views/QuestionItemView' );
	var NoItemView        = require( 'videoPlayer/views/NoItemView');

	var template = require( 'text!videoPlayer/templates/questionsCompositeView.html' );

	return Marionette.CompositeView.extend( {

		'className' : 'col-xs-11 right-bar',

		'template' : _.template( template ),

		'itemView' : QuestionsItemView,

		'itemViewOptions' : function () {
			return {
				'textLock' : !this.collection.showFollowup()
			};
		},

		'emptyView' : NoItemView,

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

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );
		},

		'onCompositeCollectionRendered' : function () {
			// Reinitialized carousel after composite view is re-rendered.
			var slick = this.ui.carousel.get( 0 ).slick;
			if ( slick ) {
				this.ui.carousel.unslick();
				this.ui.carouselCont.css( 'overflow-y', 'hidden' );
				this.showCarousel();
			}
		},

		'onShow' : function () {
			this.showCarousel();
			this.showPagination();
		},

		'showCarousel' : function () {
			this.ui.carousel.slick( {
				'slidesToShow'   : 1,
				'slidesToScroll' : 1,
				'infinite'       : false,
				'arrows'         : false,
				'speed'          : 100,
				'slide'          : 'li',
				'onInit'         : this.onCarouselInit.bind( this ),
				'onAfterChange'  : this.afterCarouselChange.bind( this )
			} );
		},

		'updateHeader' : function ( index ) {
			var header = {
				'1' : 'Reflection Questions',
				'2' : 'Follow-up Questions'
			};
			var model = this.collection.at( index );
			this.ui.headerTitle.text( header[ model.get( 'QuestionTypeId') ] );
		},

		'showPagination' : function () {
			this.ui.currentPage.text( 1 );
			this.ui.lastPage.text( this.collection.length );
		},

		'nextQuestion' : function () {
			var slide = this.ui.carousel.slickCurrentSlide();
			if ( slide + 1 < this.collection.length ) {
				this.ui.carousel.slickNext();
			}
		},

		'prevQuestion' : function () {
			var slide = this.ui.carousel.slickCurrentSlide();
			if ( slide > 0 ) {
				this.ui.carousel.slickPrev();
			}
		},

		'updatePagination' : function ( page ) {
			this.ui.currentPage.text( page );
		},

		'onCarouselInit' : function () {
			this.ui.carouselCont.css( 'overflow-y', 'auto' );
		},

		'afterCarouselChange' : function ( elem, page ) {
			this.updatePagination( page + 1 );
			this.updateHeader( page );
		}

	} );

} );
