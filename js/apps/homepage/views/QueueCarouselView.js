define( function ( require ) {
	'use strict';

	var _ = require( 'underscore' );

	var CarouselView      = require( 'common/views/CarouselView' );
	var SegmentCardsView  = require( 'common/views/SegmentCardsView' );
	var CarouselEmptyView = require( 'common/views/CarouselEmptyView' );
	var template          = require( 'text!common/templates/videoCarouselView.html' );

	return CarouselView.extend( {

		'template' : _.template( template ),

		'className' : 'videos-carousel owl-carousel',

		'itemView'  : SegmentCardsView,

		'emptyView' : CarouselEmptyView,

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.listenTo( this.collection, 'store:model:removed', this.onRemoved );
			this.listenTo( this.collection, 'store:model:added', this.itemAdded );
		},

		// Overriding showEmptyView of marionette.collectionview.
		// Instead of adding emptyview as a child, attach emptyview
		// after 'this.el'. So carousel won't include emptyview as
		// a carousel item.
		'showEmptyView' : function () {
			var EmptyView = this.getEmptyView();

			if ( EmptyView && !this._showingEmptyView && this._carouselInitialized ) {
				this._showingEmptyView = true;
				this._emptyView = new EmptyView();
				this.$el.after( this._emptyView.render().el );
			}
		},

		'closeEmptyView' : function () {
			if ( this._showingEmptyView ) {
				this._emptyView.remove();
				delete this._showingEmptyView;
			}
		},

		'findChildrenByModelId' : function ( model ) {
			var v;
			this.children.each( function ( view ) {
				if ( view.model.id === model.id ) {
					v = view;
				}
			} );
			return v;
		},

		// Removes an item manually in the composite view and carousel.
		// We don't want marionette handling remove/add to
		// avoid carousel duplicating views.
		'onRemoved' : function ( model ) {
			var modelIndex = this.collection.indexOf( model );
			var view = this.findChildrenByModelId( model );

			this.collection.remove( model, { 'silent' : true } );
			// Show emptyview if 'this.collection' is empty.
			this.checkEmpty();

			this.collection.trigger( 'updateCount' );
			this.children.remove( view );

			// Remove view from carousel specified by 'modelIndex'.
			this.removeItem( modelIndex );
		},

		'itemAdded' : function ( model ) {
			var view = new SegmentCardsView( { 'model' : model } );

			this.closeEmptyView();

			view.render().matchedSegmentsToQueue();
			this.collection.add( model, { 'silent' : true, 'at' : 0 } );
			this.collection.trigger( 'updateCount' );
			this.children.add( view );

			// Add view in the beginning of the carousel.
			this.addItem( view.el, 0 );
		},

		'onShow' : function () {
			this.trigger( 'show:carousel' );
			this.checkEmpty();
		},

		'getCarouselEl' : function () {
			return this.el;
		}

	} );

} );
