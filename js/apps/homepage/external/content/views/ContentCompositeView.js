define( function ( require ) {
	'use strict';

	var Marionette                = require( 'marionette' );
	var $                         = require('jquery');
	var _                         = require( 'underscore' );
	var template                  = require( 'text!apps/homepage/external/content/templates/contentCompositeView.html' );
	var ContentItemCollectionView = require( 'apps/homepage/external/content/views/ContentItemCollectionView' );
	var controller                = require( 'apps/homepage/external/content/controllers/contentCompositeController' );

	var heading = '<%- heading %>';

	function insertHeader ( view ) {
		var _header = view.model ? view.model.get( 'baseObject' )._header : '';

		return $.isFunction( _header ) ? _header( view.model.get( 'baseObject' ).sharedData ) : _header;
	}

	function preInitialize ( view ) {
		view.template = _.template( template.replace( heading, insertHeader( view ) ) );
	}

	return Marionette.CompositeView.extend( {
		'itemView'  : ContentItemCollectionView,
		'className' : 'vid-container',

		'initialize' : function ( options ) {
			preInitialize( this );
			controller.doInitialize( this );
		},
		'events' : {
			'click #next-slide-recommended' : function ( evt ) {

				$( '.sc-segment-image-container a' ).each( function ( ) {

				} );
			}
		},
		'itemViewOptions' : function () {
			return controller.doItemViewOptions( this );
		},

		'id' : function () {
			return controller.doId( this );
		},

		'onRender' : function () {
			var attributes = {
				'data-bootstro-placement' : 'top',
				'data-bootstro-content'   : 'Your queue displays content that you select to watch later. When you find content that you want to add to your queue, click Add to Queue.'
			};

			if ( this.$el.attr( 'id' ) === 'recommended-wrapper' ) {
				attributes = {
					'data-bootstro-placement' : 'top',
					'data-bootstro-content'   : 'The Recommended section displays content the system suggests for you based on your user profile. To learn more about using the system, complete the Getting Started with PD 360 [or insert product name] Essentials online training '
				};
			}

			this.$el.addClass( 'bootstro' );
			this.$el.attr( attributes );
		}

	} );
} );
