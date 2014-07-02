define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );
	var Backbone   = require( 'backbone' );
	var _          = require( 'underscore' );

	require( 'jquery.spin' );

	var SegmentCardFooterItemView = require( '../../views/SegmentCard/SegmentCardsFooterItemView' );

	var setIcon = {

		'infoIcon' : function () {

			var opts = {
				'icons' : 'sc-info-icon fa-info-circle'
			};
			return opts;
		},

		'queueIcon' : function () {
			var opts = {
				'icons' : 'sc-watch-later-icon fa-clock-o'
			};
			return opts;
		},

		'doneIcon' : function () {
			var opts = {
				'icons' : 'sc-completed-icon fa-check-circle success'
			};
			return opts;
		}
	};

	return Marionette.CollectionView.extend( {

		'itemView'  : SegmentCardFooterItemView,
		'className' : 'sc-icons',
		'tagName'   : 'ul',

		'initialize' : function () {

			var updatedModel = [ ];

			_.extend( updatedModel, _.map( this.model.get( 'SegmentCard' ), function ( icons, key ) {
				return _.extend( setIcon[ key ](), this.model.attributes );
			}.bind( this ) ) );

			if ( this.model.get( 'SegmentCard' ).doneIcon && this.model.get( 'ViewingCompleted' ) ) {
				updatedModel.splice( 1, 1 );
			}

			if ( !this.model.get( 'SegmentCard' ).doneIcon || !this.model.get( 'ViewingCompleted' ) ) {
				updatedModel.splice( 2, 1 );
			}

			this.collection = new Backbone.Collection( updatedModel );

			return this;
		}
	} );
} );
