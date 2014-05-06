define( function ( require ) {
	'use strict';

	var App      = require( 'App' );
	var Backbone = require( 'backbone' );
	var Pages    = require( 'admin/data/Sinet' );

	var List = Backbone.Collection.extend( {
		'comparator' : 'name'
	} );

	var Sinet = new List( Pages );

	App.reqres.setHandler( 'admin:pages:sinet', function () {
		return Sinet;
	} );

} );
