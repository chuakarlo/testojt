define( function ( require ) {
	'use strict';

	var _             = require( 'underscore' );
	var Marionette    = require( 'marionette' );
	var GroupItemView = require( '../views/GroupItemView' );
	var template      = require( 'text!../templates/groupsView.html' );

	return Marionette.CompositeView.extend( {

		'template'          : _.template( template ),
		'id'                : 'groups',
		'itemView'          : GroupItemView,
		'tagName'           : 'section',
		'itemViewContainer' : '.row',

		'templateHelpers' : function () {

			return {

				'memberCount' : function () {
					return this.collection.count;
				}.bind( this )

			};

		}

	} );

} );
