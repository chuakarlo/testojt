define( function ( require ) {
	'use strict';

	var Marionette                = require( 'marionette' );
	var _                         = require( 'underscore' );
	var template                  = require( 'text!apps/homepage/external/content/templates/contentCompositeView.html' );
	var ContentItemCollectionView = require( 'apps/homepage/external/content/views/ContentItemCollectionView' );
	var controller                = require( 'apps/homepage/external/content/controllers/contentCompositeController' );

	return Marionette.CompositeView.extend( {
		'template'  : _.template( template ),
		'itemView'  : ContentItemCollectionView,
		'className' : 'container',

		'initialize' : function ( options ) {
			controller.doInitialize( this );
		},
		'templateHelpers' : function () {
			return controller.doTemplateHelpers( this );
		},
		'itemViewOptions' : function () {
			return controller.doItemViewOptions( this );
		},
		'id'              : function () {
			return controller.doId( this );
		}
	} );
} );
