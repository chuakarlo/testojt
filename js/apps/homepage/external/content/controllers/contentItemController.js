define( function ( require ) {
	'use strict';

	var App      = require( 'App' );

	var QueueModel = require( 'apps/homepage/external/content/external/your-queue/models/QueueModel' );
	var $          = require( 'jquery' );
	var utils = require( 'apps/homepage/external/content/utils/contentItemUtil' );

	var queueClasses = [ 'add-to-queue', 'recommended-remove-from-queue', 'remove-from-queue' ];

	var queueSelector              = '#your-queue-wrapper';
	var queueCountSelector         = '#your-queue-count';
	var recommendedWrapperSelector = '#recommended-wrapper';
	var toggleText                 = [ 'Watch Later', 'Remove from Queue' ];

	return {

		'doAddtoMyQueue' : function ( _this, e ) {
			var newQueue   = new QueueModel();

			utils.switchRemove( e );
			newQueue.save( _this.model.attributes, {
				'success'  : function () {
					utils.addSuccess( _this );
				},
				'error' : function () {
					utils.addError( e );
				}
			} );
		},

		'doSetTemplateHelper' : function ( view ) {
			var model       = view.model;
			var contentName = model.get( 'ContentName' ) || '';
			var watchToggle = ( model.get( 'renderToggle' ) )( view.model.collection, view.model );

			return {
				'imageUrl'      : utils.getImageUrl( model ),
				'topic'         : view.limitCharacter( contentName, 35 ),
				'duration'      : utils.getDuration( model ),
				'watchToggle'   : utils.queueCheck( watchToggle, model ),
				'contentStatus' : watchToggle === queueClasses[ 0 ] ? toggleText[ 0 ] : toggleText[ 1 ]
			};
		},

		'doEnableTooltip' : function ( e ) {
			var contentBtn = $( e.currentTarget );
			var content    = toggleText[ contentBtn.hasClass( queueClasses[ 0 ] ) ? 0 : 1 ];

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
					utils.removeSuccess( _this, contentBtn, totalCount );
				},
				'error'   : function () {
					utils.removeError( contentBtn );
				}
			} );
		},

		'doChangeRecommendedIcon' : function ( _that, removedModel ) {
			if ( _that.model.get( 'ContentId' ) === removedModel.get( 'ContentId' ) ) {

				var recommendedUL = $( recommendedWrapperSelector + ' ul' );
				var contentBtn    = recommendedUL.find( '#content-button-'+ _that.model.get( 'ContentId' ) );
				utils.switchClass( contentBtn, queueClasses[ 0 ], queueClasses[ 1 ] );

				_that.model.attributes.renderToggle = function () {
					return queueClasses[ 0 ];
				};
				_that.render();
			}
		},

		'doRemoveQueueByRecommended' : function ( _that, e ) {
			var contentBtn = $( e.currentTarget );

			$( queueSelector + ' ul' ).trigger( 'removeQueueByRecommended', _that );
			utils.switchClass( e, queueClasses[ 1 ], queueClasses[ 0 ] );
			contentBtn.attr( 'data-original-title', toggleText[ 0 ] );
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
		},

		'doVideoLink' : function ( e ) {
			App.navigate( 'resources/videos/' + $(e.currentTarget).attr('data-id'), { 'trigger' : true } );
		}
	};
});