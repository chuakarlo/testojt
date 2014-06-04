define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/emptyView.html' );

	return Marionette.CompositeView.extend( {

		'template'   : _.template( template ),

		'className'  : 'groups-invites-empty-view',

		'initialize' : function () {
			this.options.parentOptions.$el.find('h2').hide();
		}

	} );

} );
