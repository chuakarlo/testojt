define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	App.module( 'Entities', function ( Mod ) {

		// This is a little helper model to keep track of what to query when
		// doing infinite scrolling
		Mod.WallQueryModel = Backbone.Model.extend( {
			'defaults' : {
				'startRow'  : 0,
				'numRows'   : 15,
				'totalRows' : 80,
				'msgFlag'   : 1,
				'newsFlag'  : 1
			}

		} );

	} );
} );
