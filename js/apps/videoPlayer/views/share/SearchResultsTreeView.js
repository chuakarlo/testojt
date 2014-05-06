define( function ( require ) {
	'use strict';

	var $             = require( 'jquery' );
	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var App           = require( 'App' );
	var template      = require( 'text!videoPlayer/templates/share/searchResultsTreeView.html' );
	var groupItemTpl  = require( 'text!videoPlayer/templates/share/groupItemView.html' );
	var personItemTpl = require( 'text!videoPlayer/templates/share/personItemView.html' );

	// The recursive tree view
	return Marionette.CompositeView.extend({

		'template' : _.template( template ),
		'tagName'  : 'li',

		'ui' : {
			'resultItem' : '.result-item'
		},

		'events' : {
			'mousedown @ui.resultItem' : 'selectItem'
		},

		'selectItem' : function ( e ) {
			e.preventDefault();
			e.stopPropagation();

			App.vent.trigger( 'videoPlayer:share:item:selected', this );
		},

		initialize : function () {
			// grab the child collection from the parent model
			// so that we can render the collection as children
			// of this parent node
			this.collection = this.model.nodes;
		},

		'appendHtml' : function ( collectionView, itemView ) {
			collectionView.$( 'ul:first' ).append( itemView.el );
		},

		'onShow' : function () {
			// remove empty ul's
			if ( _.isUndefined( this.collection ) ) {
				this.$( 'ul:first' ).remove();
			}

			// bind a click event on the body
			$( 'body' ).bind( 'click.shareVideoDialog', this._triggerClickBody );
		},

		'onClose' : function () {
			$( 'body' ).unbind( 'click.shareVideoDialog' );
		},

		'_triggerClickBody' : function ( event ) {
			App.vent.trigger( 'videoPlayer:click:body', event );
		},

		'templateHelpers' : {

			'getNodeData' : function () {
				if ( this.nodeName ) {
					return '<h4 class="list-group-header">' + this.nodeName + '</h4>';
				} else if ( this.LicenseName ) {
					return _.template( groupItemTpl, this );
				} else {
					return _.template( personItemTpl, this );
				}
			}

		}

	} );

} );
