define( function ( require ) {
	'use strict';
	require( 'slick' );
	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var GroupItemView = require( '../views/GroupInvitesItemView' );
	var template      = require( 'text!../templates/groupInvitesView.html' );
	var EmptyView     = require( '../views/EmptyView' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'id'                : 'group-invites',
		'itemView'          : GroupItemView,
		'tagName'           : 'div',
		'itemViewContainer' : '.groups-list',
		'emptyView'			: EmptyView,
		'ui' : {
			'next'     : 'button.slick-next',
			'prev'     : 'button.slick-prev',
			'carousel' : '.groups-list'
		},

		'itemViewOptions' : function () {
			return { parentOptions : this };
		},

		'onShow' : function () {
			if ( this.options.collection.length > 4 ) {
				this.ui.carousel.slick( {
					'infinite'       : false,
					'slidesToShow'   : 4,
					'slidesToScroll' : 4
				} );
			}
		},

		'templateHelpers' : function () {

			return {

				'memberCount' : function () {
					return this.collection.count;
				}.bind( this ),

				'getAbbreviation' : require( 'common/helpers/getAbbreviation' )

			};

		}

	} );

} );
