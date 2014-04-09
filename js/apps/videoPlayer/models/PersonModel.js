define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );

	return Backbone.Model.extend( {

		'idAttribute' : 'PersonnelId',

		'initialize' : function () {
			this.set( 'Name', this.get( 'FirstName' ) + ' ' + this.get( 'LastName' ) );
			this.set( 'Location', this.get( 'DistrictName' ) + ', ' + this.get( 'State' ) );
		}

	} );

} );
