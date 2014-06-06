define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.CFModel.extend( {

		'initialize' : function () {
			if ( this.get( 'PersonnelId' ) ) {
				this.id = this.get( 'PersonnelId' );
			} else {
				this.id = this.get( 'LicenseId' );
			}
		},

		'isPerson' : function () {
			if ( this.get( 'PersonnelId' ) ) {
				return true;
			}

			return false;
		}

	} );

} );
