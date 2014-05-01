define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var GroupItemView = require( '../views/GroupInvitesItemView' );
	var template      = require( 'text!../templates/groupInvitesView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'id'                : 'group-invites',
		'itemView'          : GroupItemView,
		'tagName'           : 'section',
		'itemViewContainer' : '.groups-list',

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
