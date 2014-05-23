define( function ( require ) {
	'use strict';

	// libraries
	var $                 = require( 'jquery' );
	var _                 = require( 'underscore' );
	var Backbone          = require( 'backbone' );
	var Marionette        = require( 'marionette' );
	var App               = require( 'App' );
	var Ladda             = require( 'ladda' );
	var SelectedItemsView = require( 'videoPlayer/views/share/SelectedItemsCollectionView' );

	// view template
	var template = require( 'text!videoPlayer/templates/share/shareVideoLayout.html' );

	return Marionette.Layout.extend( {

		'template'  : _.template( template ),
		'className' : 'modal-dialog',

		'regions' : {
			'sharedVideoRegion'   : '#shared-video',
			'searchResultsRegion' : '#search-results',
			'selectedItemsRegion' : '#selected-items'
		},

		'ui' : {
			'searchInput' : '.search-input',
			'shareButton' : '#share-btn',
			'message'     : '.message > textarea'
		},

		'events' : {
			'keyup @ui.searchInput' : 'search',
			'click @ui.searchInput' : 'selectText',
			'click @ui.shareButton' : 'shareVideo'
		},

		'initialize' : function ( options ) {
			_.bindAll( this );
			_.extend( this, options );

			this.selectedItems = new Backbone.CFCollection();

			// common loading instance
			this.loadingView = new App.Common.LoadingView( {
				'background' : true,
				'size'       : 'small'
			} );

			// selected search items view
			this.selectedItemsView = new SelectedItemsView( {
				'collection' : this.selectedItems
			} );

			// listen for click events on the body to hide the search results
			this.listenTo( App.vent, 'videoPlayer:click:body', this.hideSearchResults );

			// listen for select item event
			this.listenTo( App.vent, 'videoPlayer:share:item:selected', this.selectItem );

			// listen for selected items add/remove events
			this.listenTo( this.selectedItems, 'add remove', this.setShareBtnState );

			this.listenTo( App.vent, 'error:searchPeopleAndGroups', this.hideSearchResults );
		},

		'onShow' : function () {
			this.selectedItemsRegion.show( this.selectedItemsView );
		},

		'selectText' : function () {
			this.ui.searchInput.select();
		},

		'search' : function () {
			if ( this.ui.searchInput.val().trim() !== '' ) {
				// show loading view
				this.searchResultsRegion.show( this.loadingView );

				// request search person and groups
				App.request( 'videoPlayer:searchPeopleAndGroups', this );
			} else {
				this.searchResultsRegion.close();
			}
		},

		'selectItem' : function ( itemView ) {
			this.selectedItems.add( itemView.model );
			this.ui.searchInput.val( itemView.model.getName() );
			this.hideSearchResults();
			this.ui.searchInput.blur();
		},

		'hideSearchResults' : function ( event ) {
			if ( !_.isUndefined( event ) &&
				$( event.target ).hasClass( 'search-input' ) ) {
				return;
			}

			this.searchResultsRegion.close();
		},

		'setShareBtnState' : function () {
			var disable = this.selectedItems.length === 0 ? true : false;

			this.ui.shareButton.attr( {
				'disabled' : disable
			} );
		},

		'shareVideo' : function () {
			// initialize ladda for share video button
			var l = Ladda.create( document.querySelector( '#share-btn' ) );
			l.start();

			// request to share video
			App.request( 'videoPlayer:share:video', this.getShareObject() );
		},

		'getShareObject' : function () {
			// object for holding personnels, groups and message for sharing
			var shareTargets = {
				'personnels' : [ ],
				'groups'     : [ ],
				'message'    : ''
			};

			// share object message
			shareTargets.message = this.ui.message.val() + ' ' + this.model.get( 'VideoUrl' );

			// share object personnels and groups
			_.each( this.selectedItems.models, function ( model ) {
				if ( model.isPerson() ) {
					shareTargets.personnels.push( model.id );
				} else {
					shareTargets.groups.push( model.id );
				}
			}.bind( this ) );

			return shareTargets;
		}

	} );

} );
