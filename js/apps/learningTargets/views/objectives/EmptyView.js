define( function ( require ) {
	'use strict';

	var _          = require( 'underscore' );
	var Marionette = require( 'marionette' );
	var template   = require( 'text!apps/learningTargets/templates/objectives/empty.html' );

	return Marionette.ItemView.extend( {

		'template' : _.template( template ),

		initialize : function ( ) {
			this.FocusTitle     = '';
			this.showFocusTitle = 'hide';

			if ( this.options.data ) {
				this.FocusTitle     = this.options.data.focustitle;
				this.showFocusTitle = '';
			}
		},

		templateHelpers : function ( ) {
			return {
				FocusTitle     : this.FocusTitle,
				showFocusTitle : this.showFocusTitle
			};
		}

	} );

} );
