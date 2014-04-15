define( function ( require ) {
	'use strict';

	var QueueModel = require( 'apps/homepage/external/content/external/your-queue/models/QueueModel' );
	var $          = require( 'jquery' );
	var _          = require( 'underscore' );

	var UIManager       = require( 'apps/homepage/external/content/external/agents/UIManager' );
	var templateTooltip = require( 'text!apps/homepage/external/content/templates/contentTooltipView.html' );

	var queueClasses = [ 'add-to-queue', 'recommended-remove-from-queue' ];
	var defaultImage = 'http://builtbyhq.com/projects/school/CORE/v1/img/vid-9.png';

	var imageBaseURL = 'http://resources.pd360.com/PD360/media/thumb/';

	var queueSelector              = '#your-queue-wrapper';
	var queueCountSelector         = '#your-queue-count';
	var recommendedWrapperSelector = '#recommended-wrapper';
	var queueWrapperSelector       = '#your-queue-wrapper';
	var toggleText                 = [ 'Watch Later', 'Remove from Queue' ];

	var queueInfo  = 'This content is already added to your queue.';
	var queueError = 'Something went wrong. Please try again later.';

	function switchClass ( e , from, to) {
		var contentBtn = $( e.currentTarget );
		console.log( contentBtn );
		console.log( from );
		console.log( to );
		contentBtn.switchClass( from, to );
		return contentBtn;
	}

	function switchRemove( e ) {
		switchClass( e, queueClasses[0], queueClasses[1] );
	}

	function switchAdd( e ) {
		switchClass( e, queueClasses[1], queueClasses[0] );
	}

	function getDuration ( model ) {
		var secs        = model.get( 'SegmentLengthInSeconds' );
		var minutes     = Math.floor( secs / 60 );
		return minutes + ':' + ( secs - minutes * 60 );
	}

	function getImageUrl ( model ) {
		var image       = model.get( 'ImageURL' );
		return image ? imageBaseURL + image : defaultImage;
	}

	function addSuccess ( _this ) {
		$( queueSelector + ' ul' ).trigger( 'addToMyQueue', _this.model.attributes );
	}

	function addError ( e ) {
		switchAdd( e ).tooltip( {
			'content' : _.template( templateTooltip, {
				'type'    : 'info',
				'message' : queueInfo
			} )
		} ).tooltip( 'open' );
	}

	function removeSuccess ( _this, contentBtn, totalCount ) {
		var item = contentBtn.closest('li');
		$( recommendedWrapperSelector + ' ul li' ).trigger( 'changeRecommendedIcon', _this.model );

		if ( !totalCount ) {
			var parent = _this.$el.closest( 'ul' );
			parent.css( 'width', 'auto' );
			parent.trigger( 'reRenderView' );
		}
		UIManager.removeItemOnCarousel( queueWrapperSelector + ' ul', item );
	}

	function removeError ( contentBtn ) {
		contentBtn.tooltip(_.template( templateTooltip, {
			'type'    : 'warning',
			'message' : queueError
		} ) ).tooltip( 'open' );
	}

	return {

		'doAddtoMyQueue' : function ( _this, e ) {
			var newQueue   = new QueueModel();

			switchRemove( e );
			newQueue.save( _this.model.attributes, {
				'success'  : function () {
					addSuccess( _this );
				},
				'error' : function () {
					addError( e );
				}
			} );
		},

		'doSetTemplateHelper' : function ( view ) {
			var model       = view.model;
			var contentName = model.get( 'ContentName' );
			var watchToggle = ( model.get( 'renderToggle' ) )( view.model.collection, view.model );

			return {
				'contentId'   : model.get( 'ContentId' ),
				'imageUrl'    : getImageUrl( model ),
				'topic'       : view.limitCharacter( contentName, 43 ),
				'duration'    : getDuration( model ),
				'watchToggle' : watchToggle
			};
		},

		'doEnableTooltip' : function ( e ) {
			var contentBtn = $( e.currentTarget );
			var content    = toggleText[ contentBtn.hasClass( queueClasses[0] ) ? 0 : 1 ];

			contentBtn.tooltip( {
				'placement' : 'top',
				'content'   : content
			} );
		},

		'doRemoveFromQueue' : function ( _this, e ) {
			var contentBtn = $( e.currentTarget );
			var counter    = $( queueCountSelector );
			var totalCount = _this.model.collection.length - 1;

			// Change the header
			counter.html( totalCount );
			_this.model.destroy( {
				'dataType' : 'text',
				'success'  : function () {
					removeSuccess( _this, contentBtn, totalCount );
				},
				'error'   : function () {
					removeError( contentBtn );
				}
			} );
		},

		'doChangeRecommendedIcon' : function ( _that, removedModel ) {
			if ( _that.model.get( 'ContentId' ) === removedModel.get( 'ContentId' ) ) {

				var recommendedUL = $( recommendedWrapperSelector + ' ul' );
				var contentBtn    = recommendedUL.find( '#content-button-'+ _that.model.get( 'ContentId' ) );
				contentBtn.switchClass( queueClasses[ 1 ], queueClasses[ 0 ] );

				_that.model.attributes.renderToggle = function () {
					return queueClasses[0];
				};
				_that.render();
			}
		},

		'doRemoveQueueByRecommended' : function ( _that, e ) {
			var contentBtn = $( e.currentTarget );

			$( queueSelector + ' ul' ).trigger( 'removeQueueByRecommended', _that );
			contentBtn.switchClass( queueClasses[1], queueClasses[0] );
		},

		'doViewTags' : function ( _this, e ) {
			var tags = _this.model.get('Tags');
			if( tags ) {
				var contentBtn = $( e.currentTarget );
				var strTags = { 'title' : _this.model.get('ContentName') , 'tags' : tags };
				var data = JSON.stringify( strTags );

				contentBtn.tooltip( {
					'placement' : 'top',
					'content'   : data.replace( /,/g, ', ' )
				} );
			}
		}
	};
});