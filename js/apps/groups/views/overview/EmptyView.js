define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!groups/templates/overview/emptyView.html' );

	return Marionette.CompositeView.extend( {

		'template'   : _.template( template ),

		'className'  : 'groups-invites-empty-view',

		'initialize' : function () {
			if ( this.options.parentOptions ) {
				this.options.parentOptions.$el.find( 'h2' ).hide();
			}

			if ( this.options.groupOptions ) {
				this.options.groupOptions.$el.find( 'h2' ).html( 'You are not a member of any groups.' );
			}

		}

	} );

} );
