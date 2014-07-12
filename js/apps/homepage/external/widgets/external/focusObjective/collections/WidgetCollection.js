define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	return Backbone.CFCollection.extend( {

		'path' : 'SessionService',

		'getReadOptions' : function () {
			return {
				'method' : 'getIndividualFocusObjectivesIncompleteContent',
				'args'   : {
					'persId' : App.request( 'session:personnelId' )
				}
			};
		}

	} );

} );
