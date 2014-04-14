define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!../templates/ModalLayout.html' );

	return Marionette.Layout.extend( {
		
		'template' : _.template( template ),

		'className' : 'modal fade',

		'regions'  : {
			'modalRegion' : '.modal-dialog',
		},

		'attributes' : {
			'tabindex' : '-1',
			'role'     : 'dialog'
		},

		'initialize' : function( options ) {
			this.size = options.size;
		},

		'templateHelpers' : function() {
			var size = this.size;
			return {
				'ModalSize' : function() {
					return size;
				}
			};
		}

	} );

} );
