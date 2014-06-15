define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var App        = require( 'App' );
	var Utils      = App.Homepage.Utils;

	var EmptyContentCollectionView = require( 'apps/homepage/external/content2/views/EmptyContentCollectionView' );

	require( 'apps/homepage/external/content2/agents/Listener' );
	require( 'common/entities/Queue' );

	function processCount ( view ) {
		var child = view.$el.parent().find( '#' + view.model.get( 'id' ) + '-count' );
		child.html( view.collection.length );
		child.parent().removeClass( 'invisible' );
	}

	function iterateModel ( view, collection ) {
		collection.models.forEach( function ( model ) {
			var contentId    = model.get( 'ContentId' );
			var hasContentId = ( contentId && contentId !== 0 );
			var newContentId = hasContentId ? contentId : model.get( 'UUVideoId' );

			model.set( 'id', newContentId );
			model.set( 'ContentId', newContentId  );
			model.set( 'VideoTypeId', hasContentId ? 1 : 2 );

			Utils.modelGet( view.model, 'modelLogic', Utils.defaults.func )( model );
		} );
	}

	function bindListeners ( view ) {
		view.listenTo( view.collection, 'add', view.render );
		view.listenTo( view.collection, 'remove', view.render );
	}

	return Marionette.CollectionView.extend( {
		'tagName'         : 'ul',
		'className'       : 'row',
		'emptyView'       : App.Common.LoadingView,
		'itemView'        : App.Common.SegmentCardsView,
		'itemViewOptions' : function () {
			return this.model.get( 'EmptyMessage' );
		},
		'initialize'      : function () {
			if ( this.model ) {
				var that = this;
				var modelCollection = new (this.model.get( 'collection' ))();
				modelCollection.fetch( {
					'success' : function ( collection, response ) {
						Utils.proceedHomeAction( function () {
							that.emptyView   = EmptyContentCollectionView;

							Utils.modelGet( that.model, 'fetchLogic', Utils.defaults.func )( collection );

							iterateModel( that, collection );
							that.collection = collection;

							processCount( that );
							that.render();

							Utils.addActiveCollection( 'content:' + that.model.get( 'id' ) , that );

							bindListeners( that );
						});
					},
					'error'   : function () {
						App.vent.trigger ( 'flash:message', {
							'message' : 'An error occurred. Please try again later.'
						} );
						this.emptyView = EmptyContentCollectionView;
						this.render();
					}
				} );
			}
		},
		'onRender'        : function () {
			var that = this;
			Utils.proceedHomeAction( function () {
				that.$el.find( '.content-button' ).tooltip();
			});
		}
	} );
} );
