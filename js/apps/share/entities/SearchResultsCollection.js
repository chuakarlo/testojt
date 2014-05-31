define( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var Session  = require( 'Session' );
	var _        = require( 'underscore' );

	return Backbone.CFCollection.extend( {

		'path' : 'RespondService',

		'initialize' : function ( models, options ) {
			this.searchData = options.searchData;
		},

		'getReadOptions' : function () {
			return {
				'method' : 'RespondSearchGroupsAndUsers',
				'args'   : {
					'personnelId' : Session.personnelId(),
					'searchData'  : this.searchData
				}
			};
		},

		'parse' : function ( response ) {
			if ( response.PERSONNEL.length ) {
				response.PERSONNEL.unshift( { 'title' : 'PERSONNEL' } );
			}

			if ( response.GROUPS.length ) {
				response.GROUPS.unshift( { 'title' : 'GROUPS' } );
			}

			return _.union( response.PERSONNEL, response.GROUPS );
		}

	} );

} );
