define( function ( require ) {
	'use strict';

	var App        = require( 'App' );
	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );
	var template   = require( 'text!apps/homepage/external/content2/templates/contentRowItemView.html' );

	function iterateModel ( collection, modelLogic ) {
		collection.models.forEach( function ( model ) {
			var contentId    = model.get( 'ContentId' );
			var hasContentId = ( contentId && contentId !== 0 );
			var newContentId = hasContentId ? contentId : model.get( 'UUVideoId' );

			model.set( 'id', newContentId );
			model.set( 'ContentId', newContentId  );
			model.set( 'VideoTypeId', hasContentId ? 1 : 2 );

			modelLogic( model );
		} );
	}

	function getActiveSet ( coll ) {
		var isActiveSet = '';
		if ( !coll.isActiveSet ) {
			isActiveSet      = ' active';
			coll.isActiveSet = true;
		}
		return isActiveSet;
	}

	return Marionette.CompositeView.extend( {
		initialize          : function () {
			this.collection = new Backbone.Collection( _.toArray( this.model.attributes ) );
			iterateModel( this.collection, this.model.collection.modelLogic );
		},
		'tagName'           : 'div',
		'className'         : function () {
			return 'item' + getActiveSet( App.Homepage.Utils.activeCollections[ this.model.collection.collectionId ] );
		},
		'itemView'          : App.Common.SegmentCardsView,
		'template'          : template,
		'itemViewContainer' : '.row'
	} );
} );
