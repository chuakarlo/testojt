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
		'itemViewOptions' : function () {
			return controller.doItemViewOptions( this );
		},
		'id'              : function () {
			return controller.doId( this );
		}
	} );
} );
