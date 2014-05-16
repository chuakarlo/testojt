define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );

	_.extend( Marionette.Application.prototype, {

		// Helper function for keeping track of controllers created.
		// If you extend from the BaseController, it will automatically
		// register itself with the App.
		register : function ( instance, id ) {
			if ( !this.registry ) {
				this.registry = { };
			}

			this.registry[ id ] = instance;
			return this.registry[ id ];
		},

		// When once of the BaseControllers closes, it will remove itself
		// from the registry
		'unregister' : function ( instance, id ) {
			return delete this.registry[ id ];
		},

		'resetRegistry' : function () {
			var oldCount = this.getRegistrySize();
			var regReference = this.registry;

			for ( var key in regReference ) {
				var ctrl = regReference[ key ];
				ctrl.close();
			}

			var msg = 'There were ' + oldCount + ' controllers in the registry' +
			' , there are now ' + (this.getRegistrySize());

			if ( this.getRegistrySize() > 0 ) {
				return console.warn( msg, this.registry );
			} else {
				return console.log( msg );
			}
		},

		'getRegistrySize' : function () {
			return _.size( this.registry );
		}

	} );

} );
