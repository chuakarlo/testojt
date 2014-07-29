define( function ( require ) {
	'use strict';
	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var GroupItemView = require( 'groups/views/overview/GroupInvitesItemView' );
	var template      = require( 'text!groups/templates/overview/groupInvitesView.html' );
	var EmptyView     = require( 'groups/views/overview/EmptyView' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'id'                : 'group-invites',
		'itemView'          : GroupItemView,
		'tagName'           : 'section',
		'itemViewContainer' : '.groups-list',
		'emptyView'			: EmptyView,

		'itemViewOptions' : function () {
			return { parentOptions : this };
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
