define ( function ( require ) {
	'use strict';

	var Backbone = require( 'backbone' );
	var App      = require( 'App' );

	return Backbone.CFCollection.extend( {

		'idAttribute' : 'OBSERVATIONID',

		'path' : 'ObservationService',

		'getReadOptions' : function () {
			return {
				'method' : 'getObservationsByTargetIdWithPrescribedPDCount',
				'args'   : {
					'targetId' : App.request( 'session:personnelId' )
				}
			};
		},

		// sort by most recent
		'comparator' : function ( model ) {
			var observationDate = model.get( 'OBSERVATIONDATE' );

			if ( !observationDate ) {
				return 0;
			}

			var date = new Date( observationDate );

			return -date.getTime();
		}

	} );

} );
