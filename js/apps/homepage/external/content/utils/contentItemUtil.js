define( function ( require ) {
	'use strict';

	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var UIManager       = require( 'apps/homepage/external/content/external/agents/UIManager' );
	var templateTooltip = require( 'text!apps/homepage/external/content/templates/contentTooltipView.html' );
	var QueueModel      = require( 'apps/homepage/external/content/external/your-queue/models/QueueModel' );

	var queueClasses = [ 'add-to-queue', 'recommended-remove-from-queue', 'remove-from-queue' ];
	var defaultImage = 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-9.png';

	var imageBaseURL = 'http://resources.pd360.com/PD360/media/thumb/';

	var queueSelector              = '#your-queue-wrapper';
	var recommendedWrapperSelector = '#recommended-wrapper';
	var queueWrapperSelector       = '#your-queue-wrapper';

	var queueError = 'Something went wrong. Please try again later.';

	function addSuccess ( view ) {
		$( queueSelector + ' ul' ).trigger( 'addToMyQueue', view.model.attributes );
	}

	function addError ( e ) {
		switchAdd( e ).tooltip( 'open' );
	}

	function switchAdd ( e ) {
		switchClassRaw( e, queueClasses[ 1 ], queueClasses[ 0 ] );
	}

	function switchClassRaw ( e , from, to) {
		var contentBtn = $( e.currentTarget );
		contentBtn.removeClass( from );
		contentBtn.addClass( to );
		return contentBtn;
	}

	return {
		'switchClass' : function ( e , from, to) {
			return switchClassRaw( e , from, to);
		},

		'addItemToQueue' : function ( view, e ) {
			var newQueue = new QueueModel();
			newQueue.save( view.model.attributes, {
					'success'  : function () {
						addSuccess( view );
					},
					'error' : function () {
						addError( e );
					}
				} );
		},

		'changeIconOnRemove' : function ( view ) {
			var recommendedUL = $( recommendedWrapperSelector + ' ul' );
			var contentBtn    = recommendedUL.find( '#content-button-'+ view.model.get( 'ContentId' ) );
			switchClassRaw( contentBtn, queueClasses[ 0 ], queueClasses[ 1 ] );

			view.model.attributes.renderToggle = function () {
				return queueClasses[ 0 ];
			};
			view.render();
		},

		'switchRemove' : function ( e ) {
			switchClassRaw( e, queueClasses[ 0 ], queueClasses[ 1 ] );
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