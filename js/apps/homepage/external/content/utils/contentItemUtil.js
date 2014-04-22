define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var UIManager       = require( 'apps/homepage/external/content/external/agents/UIManager' );
	var templateTooltip = require( 'text!apps/homepage/external/content/templates/contentTooltipView.html' );

	var queueClasses = [ 'add-to-queue', 'recommended-remove-from-queue', 'remove-from-queue' ];
	var defaultImage = 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-9.png';

	var imageBaseURL = 'http://resources.pd360.com/PD360/media/thumb/';

	var queueSelector              = '#your-queue-wrapper';
	var recommendedWrapperSelector = '#recommended-wrapper';
	var queueWrapperSelector       = '#your-queue-wrapper';

	var queueError = 'Something went wrong. Please try again later.';

	return {
		'switchClass' : function ( e , from, to) {
			var contentBtn = $( e.currentTarget );
			contentBtn.removeClass( from );
			contentBtn.addClass( to );
			return contentBtn;
		},

		'switchRemove' : function ( e ) {
			this.switchClass( e, queueClasses[ 0 ], queueClasses[ 1 ] );
		},

		'switchAdd' : function ( e ) {
			this.switchClass( e, queueClasses[ 1 ], queueClasses[ 0 ] );
		},

		'getDuration' : function ( model ) {
			var secs        = model.get( 'SegmentLengthInSeconds' );
			var minutes     = Math.floor( secs / 60 );
			return minutes + ':' + ( secs - minutes * 60 );
		},

		'getImageUrl' : function ( model ) {
			var image       = model.get( 'ImageURL' );
			return image ? imageBaseURL + image : defaultImage;
		},

		'addSuccess' : function ( _this ) {
			$( queueSelector + ' ul' ).trigger( 'addToMyQueue', _this.model.attributes );
		},

		'addError' : function ( e ) {
			this.switchAdd( e ).tooltip( 'open' );
		},

		'removeSuccess' : function ( _this, contentBtn, totalCount ) {
			var item = contentBtn.closest('li');
			$( recommendedWrapperSelector + ' ul li' ).trigger( 'changeRecommendedIcon', _this.model );

			if ( !totalCount ) {
				var parent = _this.$el.closest( 'ul' );
				parent.css( 'width', 'auto' );
				parent.trigger( 'reRenderView' );
			}
			UIManager.removeItemOnCarousel( queueWrapperSelector + ' ul', item );
		},

		'removeError' : function ( contentBtn ) {
			contentBtn.tooltip(_.template( templateTooltip, {
				'type'    : 'warning',
				'message' : queueError
			} ) ).tooltip( 'open' );
		},

		'queueCheck' : function ( watchToggle, model ) {
			if ( model.get( 'contentType' ) === 'recommended' && watchToggle !== queueClasses[ 0 ] ) {
				watchToggle = queueClasses[ 1 ];
			}
			return watchToggle;
		}
	};

});