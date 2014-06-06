define( function ( require ) {
	'use strict';

	var Marionette = require( 'marionette' );

	var EmptyView  = require( 'share/views/EmptyView' );
	var PersonView = require( 'share/views/PersonView' );
	var GroupView  = require( 'share/views/GroupView' );
	var HeaderView = require( 'share/views/HeaderView' );

	return Marionette.CollectionView.extend( {

		'tagName'   : 'ul',
		'emptyView' : EmptyView,

		'initialize' : function () {
			this.listenTo( this, 'itemview:item:highlight', this.toggleHighlighted );
		},

		'onShow' : function () {
			// set default selected item
			this.$el.children( 'li:eq(1)' ).addClass( 'selected' );
		},

		'getItemView' : function ( item ) {
			if ( item.get( 'PersonnelId' ) ) {
				return PersonView;
			} else if ( item.get( 'LicenseId' ) ) {
				return GroupView;
			}

			return HeaderView;
		},

		'toggleHighlighted' : function ( childView ) {
			this.$el.find( '.selected' ).removeClass( 'selected' );
			childView.$el.addClass( 'selected' );
		}

	} );

} );
