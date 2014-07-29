define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var GroupItemView = require( 'groups/views/overview/GroupItemView' );
	var template      = require( 'text!groups/templates/overview/groupsView.html' );
	var EmptyView     = require( 'groups/views/overview/EmptyView' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'id'                : 'groupSection',
		'itemView'          : GroupItemView,
		'tagName'           : 'section',
		'itemViewContainer' : '.groups-list',
		'emptyView'			: EmptyView,

		'itemViewOptions' : function () {
			return { groupOptions : this };
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
