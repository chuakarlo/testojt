define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var Backbone   = require( 'backbone' );
	var Utils      = App.Homepage.Utils;

	var EmptyContentCollectionView = require( 'apps/homepage/external/content2/views/EmptyContentCollectionView' );
	var ItemView                   = require( 'apps/homepage/external/content2/views/ContentRowItemView' );
	var template                   = require( 'text!apps/homepage/external/content2/templates/contentItemCompositeView.html' );

	function bindListeners ( view ) {
		view.listenTo( view.collection, 'add', view.render );
		view.listenTo( view.collection, 'remove', view.render );
	}

	return Marionette.CompositeView.extend( {
		'tagName'           : 'div',
		'id'                : function () {
			return 'Carousel-' + this.model.get( 'id' );
		},
		'className'         : 'carousel slide',
		'emptyView'         : App.Common.LoadingView,
		'itemView'          : ItemView,
		'template'          : template,
		'itemViewContainer' : '.carousel-inner',
		'itemViewOptions'   : function () {
			return this.model.get( 'EmptyMessage' );
		},
		'initialize'        : function () {
			if ( this.model ) {
				var that = this;
				var modelCollection = new (this.model.get( 'collection' ))();
				modelCollection.fetch( {
					'success' : function ( collection, response ) {
						Utils.proceedHomeAction( function () {
							var collectionId = 'content:' + that.model.get( 'id' );
							that.emptyView   = EmptyContentCollectionView;
							Utils.modelGet( that.model, 'fetchLogic', Utils.defaults.func )( collection );
							that.collection              = new Backbone.Collection( Utils.chunk( collection.models, 4 ) );
							that.collection.modelLogic   = Utils.modelGet( that.model, 'modelLogic', Utils.defaults.func );
							that.collection.collectionId = collectionId;
							Utils.addActiveCollection( collectionId , that );
							that.render();
							bindListeners( that );
						});
					},
					'error'   : function () {
						App.vent.trigger ( 'flash:message', {
							'message' : Utils.message.errorMsg
						} );
						this.emptyView = EmptyContentCollectionView;
						this.render();
					}
				} );
			}
		},
		'onRender'          : function () {
			var that = this;
			Utils.proceedHomeAction( function () {
				that.$el.find( '.content-button' ).tooltip();
			});
		}
	} );
} );
