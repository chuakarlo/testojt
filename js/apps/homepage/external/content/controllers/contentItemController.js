define( function ( require ) {
	'use strict';

	var App      = require( 'App' );

	var $          = require( 'jquery' );
	var utils = require( 'apps/homepage/external/content/utils/contentItemUtil' );

	var queueClasses = [ 'add-to-queue', 'recommended-remove-from-queue', 'remove-from-queue' ];

	var queueSelector              = '#your-queue-wrapper';
	var queueCountSelector         = '#your-queue-count';
	var toggleText                 = [ 'Watch Later', 'Remove from Queue' ];

	function getToggleText ( watchToggle, queueClasses ) {
		return toggleText[ watchToggle !== queueClasses[ 0 ] ];
	}

	function getQueueClass ( contentBtn ) {
		return toggleText[ !contentBtn.hasClass( queueClasses[ 0 ] ) ];
	}

	return {

		'doAddtoMyQueue' : function ( view, e ) {
			utils.switchRemove( e );
			utils.addItemToQueue( view, e );
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
				'contentStatus' : getToggleText( watchToggle, queueClasses )
			};
		},

		'doEnableTooltip' : function ( e ) {
			var contentBtn = $( e.currentTarget );
			var content    = getQueueClass( contentBtn );

			contentBtn.tooltip( {
				'placement' : 'top',
				'content'   : content
			} );
		},

		'doRemoveFromQueue' : function ( _this, e ) {
			var contentBtn = $( e.currentTarget );
			var totalCount = _this.model.collection.length - 1;

			$( queueCountSelector ).html( totalCount );

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

		'doChangeRecommendedIcon' : function ( view, removedModel ) {
			if ( view.model.get( 'ContentId' ) === removedModel.get( 'ContentId' ) ) {
				utils.changeIconOnRemove( view );
			}
		},

		'doRemoveQueueByRecommended' : function ( _that, e ) {
			var contentBtn = $( e.currentTarget );

			$( queueSelector + ' ul' ).trigger( 'removeQueueByRecommended', _that );
			utils.switchClass( e, queueClasses[ 1 ], queueClasses[ 0 ] );
			contentBtn.attr( 'data-original-title', toggleText[ 0 ] );
		},

		'doViewTags' : function ( _this, e ) {
			var tags = _this.model.get( 'Tags' );
			if( tags ) {
				var contentBtn = $( e.currentTarget );
				var strTags = { 'title' : _this.model.get( 'ContentName' ) , 'tags' : tags };
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