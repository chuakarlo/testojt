define( function ( require ) {
	'use strict';

	var $        = require( 'jquery' );
	var Backbone = require( 'backbone' );

	// Used to validate input fields on forms that use backbone.stickit and backbone.validation
	return function ( event, view ) {

		// Don't execute on tab keyup
		if ( event.type === 'keyup' && event.keyCode === 9 ) {
			return;
		}

		var attributeName = $( event.currentTarget ).attr( 'name' );
		var value         = event.currentTarget.value;

		if ( attributeName ) {
			var msg = view.model.preValidate( attributeName, value );

			Backbone.Validation.callbacks.valid( view, attributeName, 'name' );

			if ( msg ) {
				Backbone.Validation.callbacks.invalid( view, attributeName, msg, 'name' );
			}
		}

	};

} );
