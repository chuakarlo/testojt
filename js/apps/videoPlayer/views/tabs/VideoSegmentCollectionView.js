define( function ( require ) {
	'use strict';

	require( 'slick' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var VideoSegmentItemView = require( 'videoPlayer/views/tabs/VideoSegmentItemView' );
	var LoadingView          = require( 'videoPlayer/views/LoadingView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'div',

		'className' : 'slick',

		'ui'        : {
			'next' : 'button.slick-next',
			'prev' : 'button.slick-prev'
		},

		'itemView' : VideoSegmentItemView,

		'emptyView' : LoadingView,

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this._initRequest();
			this.listenTo( this.collection, 'custom:sync', this._initView );

			return this;
		},

		'_initRequest' : function () {
			if( !this.Content.get( 'Children') ) {
				this.Content.set( 'Children', [] );
			}

			var request = {
				'objectPath' : 'com.schoolimprovement.pd360.dao.core.Content',
				'args' : this.Content.toJSON()
			};

			this.collection.fetch( request, { 'reset' : true } );

		},

		'hover': function( element, time, callback ) {
			$( element ).hover( function() {
				//start time
				if ( !this.timeoutId ) {
					this.timeoutId = window.setInterval( function() {
						callback();
					}, time ); //for 1 second
				}
			}, this.clearTimeout );
		},

		'hoverNext': function( element ) {
			this.hover( this.ui.next, 1500, function() {
				element.slickNext( 1 );
			} );
		},

		'hoverPrev': function( element ) {
			this.hover( this.ui.prev, 1500, function() {
				element.slickPrev( 1 );
			} );
		},

		'clearTimeout': function() {
			//reset time
			if ( this.timeoutId ) {
				window.clearInterval( this.timeoutId );
				this.timeoutId = null;
			}

		},

		'_initView' : function () {
			this.$el.slick( {
				'slidesToShow'   : 4,
				'slidesToScroll' : 4,
				'autoplay'       : false,
				'autoplaySpeed'  : 2000,
			} );
		},

		'onClose' : function () {
			this.collection.reset( [] );
		}

	} );

} );
