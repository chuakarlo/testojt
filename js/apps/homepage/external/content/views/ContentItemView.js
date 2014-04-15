define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	var template   = require( 'text!apps/homepage/external/content/templates/contentItemView.html' );
	var controller = require( 'apps/homepage/external/content/controllers/contentItemController' );

	return Marionette.ItemView.extend( {
		'events' : {
			'mouseenter .content-button'           : 'enableTooltip' ,
			'click .remove-from-queue'             : 'removeFromMyQueue',
			'click .add-to-queue'                  : 'addToMyQueue',
			'click .recommended-remove-from-queue' : 'removeQueueByRecommended',
			'changeRecommendedIcon'                : 'changeRecommendedIcon',
			'mouseenter .vid-thumb-overlay'        : 'viewTags',
			'click a.vid-thumb-overlay'            : 'videoLink'
		},
		'template'        : _.template( template ),
		'tagName'         : 'li',
		'className'       : 'col-md-3 vid-thumb no-padding',

		'templateHelpers' : function () {
			return controller.doSetTemplateHelper( this );
		},

		'limitCharacter' : function ( text, limit ) {
			return text.length > limit ? text.substr( 0, limit ) + '...' : text;
		},

		'enableTooltip' : function ( e ) {
			controller.doEnableTooltip( e );
		},

		'removeFromMyQueue' : function ( e ) {
			controller.doRemoveFromQueue ( this, e );
		},

		'changeRecommendedIcon' : function ( event, removedModel ) {
			controller.doChangeRecommendedIcon( this, removedModel );
		},

		'addToMyQueue' : function ( e ) {
			controller.doAddtoMyQueue( this, e );
		},

		'removeQueueByRecommended' : function ( e ) {
			controller.doRemoveQueueByRecommended( this, e );
		},

		'viewTags' : function ( e ) {
			controller.doViewTags( this, e );
		},

		'videoLink' : function ( e ) {
			controller.doVideoLink( e );
			return false;
		}

	} );
} );