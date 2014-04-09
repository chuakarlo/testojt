define( function ( require ) {
	'use strict';

	// libraries
	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var Vent       = require( 'Vent' );

	// template
	var template   = require( 'text!videoPlayer/templates/videoTabsLayout.html' );

	// views
	var AdditionalResourcesLayout  = require( 'videoPlayer/views/tabs/AdditionalResourcesLayout' );
	var RelatedVideoCollectionView = require( 'videoPlayer/views/tabs/RelatedVideoCollectionView' );

	// collections
	var ContentsCollection = require( 'videoPlayer/collections/ContentsCollection' );

	return Marionette.Layout.extend( {

		'template' : _.template( template ),

		'regions' : {
			'tabContentRegion' : '.tab-content'
		},

		'ui' : {
			'additionalResourcesTab' : '#additional-resources',
			'relatedVideoTab'        : '#related-video',
			'shareVideo'             : '#share-video',
			'userQueue'              : '#user-queue'
		},

		'events' : {
			'click @ui.relatedVideoTab'        : 'relatedVideo',
			'click @ui.additionalResourcesTab' : 'additionalResources',
			'click @ui.shareVideo'             : 'shareVideo',
			'click @ui.userQueue'              : 'setUserQueue'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.contentsCollection      = new ContentsCollection();
			this.listenTo( this.contentsCollection, 'add change reset', this.setQueueBtnUI );
			return this;
		},

		'onShow' : function () {
			// fetch user queue contents
			this.fetchUserQueue();

			this.tabContentRegion.show( new AdditionalResourcesLayout( {
				'Content' : this.model
			} ) );
		},

		'shareVideo' : function ( event ) {
			Vent.trigger( 'video:show_share_modal' );
		},

		'relatedVideo' : function ( event ) {
			event.preventDefault();
			this.tabContentRegion.show( new RelatedVideoCollectionView( {
				'ContentId'  : this.model.id
			} ) );
			this.setUIRelatedVideo();
		},

		'additionalResources' : function ( event ) {
			event.preventDefault();
			this.tabContentRegion.show( new AdditionalResourcesLayout( {
				'Content' : this.model
			} ) );
			this.setUIAdditionalResources();
		},

		'setUIAdditionalResources' : function () {
			this.ui.relatedVideoTab.parent().removeClass( 'active' );
			this.ui.additionalResourcesTab.parent().addClass( 'active' );
		},

		'setUIRelatedVideo' : function () {
			this.ui.additionalResourcesTab.parent().removeClass( 'active' );
			this.ui.relatedVideoTab.parent().addClass( 'active' );
		},

		'setUserQueue' : function ( event ) {
			event.preventDefault();

			// trigger button loading state
			this.ui.userQueue.button( 'loading' );

			// check which method to execute
			if ( this.isContentInQueue() ) {
				this.removeFromUserQueue();
			} else {
				this.addToUserQueue();
			}
		},

		'fetchUserQueue' : function () {
			var options = {
				'success' : this.addToUserContents
			};

			// trigger button loading state
			this.ui.userQueue.button( 'loading' );

			this.contentsCollection.contentRequest( options );
		},

		'addToUserQueue' : function () {
			var options = {
				'model'   : this.model,
				'method'  : 'create',
				'success' : this.addToUserContents
			};

			this.contentsCollection.contentRequest( options );
		},

		'removeFromUserQueue' : function () {
			var options = {
				'model'  : this.model,
				'method' : 'deleteByObj',
				'always' : this.removeItemFromContents
			};

			this.contentsCollection.contentRequest( options );
		},

		'setQueueBtnUI' : function () {
			this.ui.userQueue.button( 'reset' );

			if ( this.isContentInQueue() ) {
				this.ui.userQueue.text( 'Remove from Queue' );
			} else {
				this.ui.userQueue.text( 'Add to Queue' );
			}
		},

		'addToUserContents' : function ( response ) {
			this.contentsCollection.add( response[ 0 ] );
		},

		'removeItemFromContents' : function ( response ) {
			var self = this;

			// remove the deleted content from user contents collection
			var newContents = _.reject( this.contentsCollection.models,
				function ( model ) {
					return ( model.id === self.model.id );
				}
			);

			this.contentsCollection.reset( newContents );
		},

		// check if the current segment is in the user contents collection
		'isContentInQueue' : function () {
			if ( this.contentsCollection.length === 0 ) {
				return false;
			} else {
				return this.contentsCollection.findWhere( {
					'ContentId' : this.model.id
				} );
			}
		}

	} );

} );
